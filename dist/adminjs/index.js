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
exports.adminJSRouter = exports.adminJs = void 0;
const adminjs_1 = __importDefault(require("adminjs"));
const express_1 = __importDefault(require("@adminjs/express"));
const sequelize_1 = __importDefault(require("@adminjs/sequelize"));
const database_1 = require("../database");
const resources_1 = require("./resources");
const bcrypt_1 = __importDefault(require("bcrypt"));
const locale_1 = require("./locale");
const dashboard_1 = require("./dashboard");
const branding_1 = require("./branding");
const userService_1 = require("../services/userService");
adminjs_1.default.registerAdapter(sequelize_1.default);
exports.adminJs = new adminjs_1.default({
    databases: [database_1.sequelize],
    rootPath: "/admin",
    resources: resources_1.adminJsResources,
    branding: branding_1.brandingOptions,
    locale: locale_1.locale,
    dashboard: dashboard_1.dashboardOptions
});
// 1. Gere uma chave longa (exemplo de 32+ caracteres)
const COOKIE_SECRET = 'sua-chave-ultra-secreta-com-mais-de-32-caracteres-123';
const sessionOptions = {
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 horas de duração
    }
};
exports.adminJSRouter = express_1.default.buildAuthenticatedRouter(exports.adminJs, {
    // Use as opções que você já tinha importado ou defina aqui
    authenticate: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userService_1.userService.findByEmail(email);
        // CUIDADO: Se sua classe 'user' usa bcrypt, use bcrypt.compareSync(password, user.password)
        if (!user) {
            return null;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (user && isPasswordValid) {
            return user;
        }
        return null;
    }),
    // O cookiePassword também deve ser longo!
    cookiePassword: 'outra-string-muito-longa-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx-para-o-cookie-32-chars',
}, null, sessionOptions);
