import uploadFileFeature from "@adminjs/upload";
import path from 'path';
import componentLoader from "../component-loader.js";
export const courseResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'],
    filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'],
    listProperties: ['id', 'name', 'featured', 'categoryId'],
    showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt'],
    properties: {
        uploadThumbnail: {
            isVisible: { edit: true, filter: false, list: false, show: true },
        },
        thumbnailUrl: {
            isVisible: { edit: false, filter: true, list: true, show: true },
        }
    }
};
// note que entre as featuretypes já existem
// objetos para aws ou google cloud service
export const courseResourceFeatures = [
    // @ts-ignore — @adminjs/upload CJS types not fully compatible with NodeNext
    uploadFileFeature({
        componentLoader,
        provider: {
            local: {
                bucket: path.resolve(process.cwd(), 'public'),
                opts: {
                    baseUrl: '/'
                }
            }
        },
        properties: {
            key: 'thumbnailUrl',
            file: 'uploadThumbnail'
        },
        uploadPath: (record, filename) => {
            const id = record.params.id || 'temp';
            return `thumbnails/course-${id}/${filename}`;
        },
        validation: {
            mimeTypes: ['image/png', 'image/jpeg']
        }
    })
];
