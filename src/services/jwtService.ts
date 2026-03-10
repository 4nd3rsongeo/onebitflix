import jwt, {SignOptions} from 'jsonwebtoken';
import { JWT_KEY } from '../config/environment';

interface JwtPayload {
  id: string;  
  email: string;
  firstName: string;
}
const EXPIRES_IN = '7d';

export const jwtService = {
  /**
   * Gera um novo token JWT
   */
  sign(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_KEY, {
      expiresIn: EXPIRES_IN,
    });
  },

  /**
   * Verifica se o token é válido
   */
  verify(token: string,  callbackfn: jwt.VerifyCallback){
   
      jwt.verify(token, JWT_KEY, callbackfn);
   
    }
  
};