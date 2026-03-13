import { Category } from "../models/index.js";
export const categoryService = {
    findAllPaginated: async (page, perPage) => {
        const offset = (page - 1) * perPage;
        const { count, rows } = await Category.findAndCountAll({
            attributes: ['id', 'name', 'position'],
            order: [['position', 'ASC']],
            limit: perPage,
            offset //note que ao invés de offset: offset, como o nome é o mesmo, em JS pode deixar só o offset
        });
        return {
            categories: rows,
            page,
            perPage,
            total: count
        };
    },
    findByIdWithCourses: async (id) => {
        const categoryWithCourses = await Category.findByPk(id, {
            attributes: ['id', 'name'],
            include: {
                association: 'courses', //essa associação precisa constar no model
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl'] //renomeia do banco para camelcase
                ]
            }
        });
        return categoryWithCourses;
    }
};
