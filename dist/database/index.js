import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../config/environment.js";
// console.log("CARREGOU O DATABASE.TS");
export const sequelize = new Sequelize(DATABASE_URL, {
    define: {
        underscored: true
    }
});
//PascalCase
//camelCase
//snake_case
