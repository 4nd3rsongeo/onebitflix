// src/adminjs/resources.ts
import { Category, Course, Episode, User } from "../../models/index.js";
import { categoryResourceOptions } from "./category.js";
import { courseResourceFeatures, courseResourceOptions } from "./course.js";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode.js";
import { userResourceOptions } from "./user.js";
export const adminJsResources = [
    {
        resource: Category,
        options: categoryResourceOptions
    },
    {
        resource: Course,
        options: courseResourceOptions,
        features: courseResourceFeatures
    },
    {
        resource: Episode,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    },
    {
        resource: User,
        options: userResourceOptions
    }
];
