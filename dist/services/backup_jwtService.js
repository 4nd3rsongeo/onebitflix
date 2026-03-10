"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'chave-do-jwt';
//export 
const jwtService = {
    signToken(payload, secret, expiration) {
        //return jwt.sign(payload, secretKey, { expiresIn: expiration });
    },
    verifyToken: (token, callbackfn) => {
        jsonwebtoken_1.default.verify(token, secretKey, callbackfn);
    }
};
