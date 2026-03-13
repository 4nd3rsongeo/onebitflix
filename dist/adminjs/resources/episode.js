import uploadFileFeature from "@adminjs/upload";
import path from 'path';
import componentLoader from '../component-loader.js';
export const episodeResourceOptions = {
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
};
export const episodeResourceFeatures = [
    // @ts-ignore — @adminjs/upload CJS types not fully compatible with NodeNext
    uploadFileFeature({
        componentLoader,
        provider: {
            local: {
                bucket: path.resolve(import.meta.dirname, '..', '..', '..', 'uploads'),
                opts: {
                    baseUrl: '/uploads'
                }
            }
        },
        properties: {
            key: 'videoUrl',
            file: 'uploadVideo'
        },
        uploadPath: (record, filename) => {
            const courseId = record.params.courseId || record.get('courseId') || 'unknown';
            console.log(`[Upload] Processing video: ${filename} for course: ${courseId}`);
            return `videos/course-${courseId}/${filename}`;
        },
        validation: {
            mimeTypes: ['video/mp4', 'video/x-msvideo', 'video/quicktime']
        }
    })
];
