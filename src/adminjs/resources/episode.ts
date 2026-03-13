import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions, BaseRecord } from "adminjs";
import path from 'path';
import componentLoader from '../component-loader.js';

export const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'secondsLong'],
  filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'],
  showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'secondsLong', 'createdAt', 'updatedAt'],
  properties: {
    uploadVideo: {
      isVisible: { edit: true, filter: false, list: false, show: true },
    },
    videoUrl: {
      isVisible: { edit: false, filter: true, list: true, show: true },
    }
  }
}

export const episodeResourceFeatures: FeatureType[] = [
  // @ts-ignore — @adminjs/upload CJS types not fully compatible with NodeNext
  uploadFileFeature({
    componentLoader,
    provider: {
      local: {
        bucket: path.resolve(process.cwd(), 'uploads'), 
        opts: {
          baseUrl: '/uploads'
        }
      }
    },
    properties: {
      key: 'videoUrl',
      file: 'uploadVideo'
    },
    uploadPath: (record: BaseRecord, filename: string) => {
      const courseId = record.params.courseId || record.get('courseId') || 'unknown';
      console.log(`[Upload] Processing video: ${filename} for course: ${courseId}`);
      return `videos/course-${courseId}/${filename}`;
    },
    validation: {
      mimeTypes: ['video/mp4', 'video/x-msvideo', 'video/quicktime']
    }
  } as any)
]