// src/models/Course.ts
import { sequelize } from '../database/index.js';
import { DataTypes } from 'sequelize';
export const Course = sequelize.define('Course', {
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
    synopsis: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    thumbnailUrl: {
        type: DataTypes.STRING
    },
    featured: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
    },
    categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
});
