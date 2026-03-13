// src/adminjs/dashboard.ts
import { PageHandler } from "adminjs"
import { Course, Episode, Category, User } from "../models/index.js" 
import componentLoader from "./component-loader.js" // Importe o seu loader central
import path from "path"

export const dashboardOptions: {
    handler?: PageHandler
    component?: string
} = {
    // Substitua o AdminJS.bundle por componentLoader.add
    component: componentLoader.add("Dashboard", path.join(import.meta.dirname, "./components/Dashboard")),
    handler: async (req, res, context) => {
        const courses = await Course.count()
        const episodes = await Episode.count()
        const category = await Category.count()
        const standardUsers = await User.count({ where: { role: 'user' } })

        res.json({
            'Cursos': courses,
            'Episódios': episodes,
            'Categorias': category,
            'Usuários': standardUsers
        })
    },
}