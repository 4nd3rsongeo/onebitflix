"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura';
const EXPIRES_IN = '7d';
exports.jwtService = {
    /**
     * Gera um novo token JWT
     */
    sign(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: EXPIRES_IN,
        });
    },
    /**
     * Verifica se o token é válido
     */
    verify(token, callbackfn) {
        jsonwebtoken_1.default.verify(token, JWT_SECRET, callbackfn);
    }
};
