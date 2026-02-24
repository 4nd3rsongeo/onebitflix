import jwt, { Secret, SignOptions } from 'jsonwebtoken'

const secretKey: Secret = 'chave-do-jwt'

//export 
const jwtService = {
  signToken(payload: object, secret: string, expiration: string) {
    //return jwt.sign(payload, secretKey, { expiresIn: expiration });
  },

    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
        jwt.verify(token, secretKey, callbackfn)
    }
}