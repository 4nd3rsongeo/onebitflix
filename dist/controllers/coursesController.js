import { courseService } from "../services/courseService.js";
import { getPaginationParams } from "../helpers/getPaginationParams.js";
import { likeService } from "../services/likeService.js";
import { favoriteService } from "../services/favoriteService.js";
// console.log('courseService no controller:', courseService)
export const coursesController = {
    //GET /courses/featured
    featured: async (req, res) => {
        try {
            const featuredCourses = await courseService.getRandomFeaturedCourses();
            return res.json(featuredCourses);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    //GET /courses/newest
    newest: async (req, res) => {
        try {
            const newestCourses = await courseService.getTopTenNewest();
            return res.json(newestCourses);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    //GET /courses/popular
    popular: async (req, res) => {
        try {
            const topTen = await courseService.getTopTenByLikes();
            return res.json(topTen);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    //GET /courses/search?name
    search: async (req, res) => {
        const { name } = req.query;
        const [page, perPage] = getPaginationParams(req.query);
        try {
            if (typeof name !== 'string')
                throw new Error('name param must be of type string');
            const courses = await courseService.findByName(name, page, perPage);
            return res.json(courses);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    //GET /courses/:id
    show: async (req, res) => {
        const userId = req.user.id;
        const { id: courseId } = req.params;
        console.log(userId);
        console.log(courseId);
        try {
            const course = await courseService.findByIdWithEpisodes(courseId);
            if (!course)
                return res.status(404).json({ message: `Curso não encontrado: courseId${courseId} userId${userId}` });
            const liked = await likeService.isLiked(userId, +courseId);
            const favorited = await favoriteService.isFavorited(userId, +courseId);
            return res.json({ ...course.get(), liked, favorited });
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
};
