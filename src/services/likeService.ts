import { Like } from "../models"

export const likeService = {
    create: async (userId: number, courseId: number) => {
        const like = await Like.create({
            userId,
            courseId
        })
        return like
    },

    delete: async (userId: number, courseId: number) => {
        // console.log("id: ", userId)
        // console.log("courseId: ", courseId)
        const like = await Like.findOne({
            where: { userId, courseId }
        })

        if (!like) return null

        await like.destroy()
        return like

       
       
       
        // const deleted = await Like.destroy({
        //     where: {
        //         userId,
        //         courseId
        //     }
        // })
        // return deleted
        // console.log("Registros deletados:", deleted)

    },
    
    isLiked: async (userId: number, courseId: number) => {
        const like = await Like.findOne({
            where: {
                userId,
                courseId
            }
        })
        return like !== null ? true : false
    }
}
