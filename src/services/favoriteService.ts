import { Favorite } from "../models"

export const favoriteService = {
    //GET
    findByUserId: async (userId: number) => {
        const favorites = await Favorite.findAll({
            where: {userId},
            include: {
                association: 'Course'
            }
        })
        return favorites
    },



    create: async (userId: number, courseId: number) => {
        const favorite = Favorite.create({
            courseId,
            userId
        })
        return favorite
    }
}

