import jwt, {SignOptions} from 'jsonwebtoken';

interface JwtPayload {
  id: string;  
  email: string;
  firstName: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura';
const EXPIRES_IN = '7d';

export const jwtService = {
  /**
   * Gera um novo token JWT
   */
  sign(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: EXPIRES_IN,
    });
  },

  /**
   * Verifica se o token é válido
   */
  verify(token: string,  callbackfn: jwt.VerifyCallback){
   
      jwt.verify(token, JWT_SECRET, callbackfn);
   
    }
  
};