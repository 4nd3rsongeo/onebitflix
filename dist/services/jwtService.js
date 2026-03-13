import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config/environment.js';
const EXPIRES_IN = '7d';
export const jwtService = {
    /**
     * Gera um novo token JWT
     */
    sign(payload) {
        return jwt.sign(payload, JWT_KEY, {
            expiresIn: EXPIRES_IN,
        });
    },
    /**
     * Verifica se o token é válido
     */
    verify(token, callbackfn) {
        jwt.verify(token, JWT_KEY, callbackfn);
    }
};
