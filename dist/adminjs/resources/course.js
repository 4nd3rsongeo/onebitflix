"use strict";
// src/adminjs/resources/course.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseResourceFeatures = exports.courseResourceOptions = void 0;
const upload_1 = __importDefault(require("@adminjs/upload"));
const path_1 = __importDefault(require("path"));
exports.courseResourceOptions = {
    parent: { name: 'Catálogo' },
    editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'],
    filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'],
    listProperties: ['id', 'name', 'featured', 'categoryId'],
    showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt']
};
// note que entre as featuretypes já existem
// objetos para aws ou google cloud service
exports.courseResourceFeatures = [
    (0, upload_1.default)({
        provider: {
            local: {
                bucket: path_1.default.join(__dirname, '..', '..', '..', 'public'),
                opts: {
                    baseUrl: '/uploads'
                }
            }
        },
        properties: {
            key: 'thumbnailUrl',
            file: 'uploadThumbnail'
        },
        uploadPath: (record, filename) => `thumbnails/course-${record.get('id')}/${filename}`
    })
];
