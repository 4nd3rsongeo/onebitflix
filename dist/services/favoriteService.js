import { Favorite } from "../models/index.js";
export const favoriteService = {
    //GET
    findByUserId: async (userId) => {
        const favorites = await Favorite.findAll({
            attributes: [['user_id', 'userId']],
            where: { userId },
            include: {
                association: 'Course',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        });
        //return favorites
        return {
            userId,
            courses: favorites.map(favorite => favorite.Course)
        };
    },
    create: async (userId, courseId) => {
        const favorite = Favorite.create({
            courseId,
            userId
        });
        return favorite;
    },
    delete: async (userId, courseId) => {
        await Favorite.destroy({
            where: {
                userId,
                courseId
            }
        });
    },
    isFavorited: async (userId, courseId) => {
        const favorite = await Favorite.findOne({
            where: {
                userId,
                courseId
            }
        });
        return favorite !== null ? true : false;
    }
};
