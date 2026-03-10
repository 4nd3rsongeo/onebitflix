"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const adminjs_1 = require("./adminjs");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(adminjs_1.adminJs.options.rootPath, adminjs_1.adminJSRouter);
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(routes_1.router);
const PORT = process.env.PORT || 3000;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.sequelize.authenticate();
            console.log("DB connection successful");
            app.listen(PORT, () => {
                console.log(`Server has started successfully at port ${PORT}`);
            });
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
// console.log("CARREGOU O SERVER.TS");
// console.log("sequelize:", sequelize);
start();
