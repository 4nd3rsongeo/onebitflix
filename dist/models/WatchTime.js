import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
export const WatchTime = sequelize.define('WatchTime', {
    seconds: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    episodeId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'episodes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
});
