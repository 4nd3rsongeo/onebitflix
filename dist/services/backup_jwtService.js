import jwt from 'jsonwebtoken';
const secretKey = 'chave-do-jwt';
//export 
const jwtService = {
    signToken(payload, secret, expiration) {
        //return jwt.sign(payload, secretKey, { expiresIn: expiration });
    },
    verifyToken: (token, callbackfn) => {
        jwt.verify(token, secretKey, callbackfn);
    }
};
