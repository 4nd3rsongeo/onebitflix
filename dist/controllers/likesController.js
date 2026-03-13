import { likeService } from "../services/likeService.js";
export const likesController = {
    //POST /likes
    save: async (req, res) => {
        const userId = req.user.id;
        const { courseId } = req.body;
        try {
            const like = await likeService.create(userId, courseId);
            return res.status(201).json(like);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    //DELETE /likes:id
    delete: async (req, res) => {
        const userId = req.user.id;
        const courseId = req.params.id;
        try {
            await likeService.delete(+userId, +courseId);
            return res.status(204).send();
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
};
