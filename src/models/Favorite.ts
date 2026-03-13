import { DataTypes, Model } from "sequelize"
import { CourseInstance } from "./Course.js"
import { UserInstance } from "./User.js"
import { sequelize } from "../database/index.js"


//createdAt e updatedAt são automáticos
export interface Favorite {
    userId: number
    courseId: number
}
//essa instância é interessante por ser uma tabela intermediária, note 
//as instância dos dois lados como opcionais...
export interface FavoriteInstance extends Model<Favorite>, Favorite {
    Course?: CourseInstance
    User?: UserInstance
}

export const Favorite = sequelize.define<FavoriteInstance, Favorite> ('Favorite', {
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    courseId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'courses',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },

})