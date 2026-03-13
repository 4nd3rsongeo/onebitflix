import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
export const Category = sequelize.define('Category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    position: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
});
