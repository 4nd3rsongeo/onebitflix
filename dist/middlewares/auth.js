import { jwtService } from "../services/jwtService.js";
import { userService } from "../services/userService.js";
export function ensureAuth(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader)
        return res.status(401).json({
            message: "Não autorizado: nenhum token foi identificado."
        });
    //Bearer 2873459fmd9uc45895c2d9ls28u4n
    //fica só com o token mesmo
    const token = authorizationHeader.replace(/Bearer /, '');
    jwtService.verify(token, async (err, decoded) => {
        if (err || typeof decoded === 'undefined')
            return res.status(401).json({
                message: 'Não autorizado: token inválido.'
            });
        //transformar em asíncrono para não precisar do then:
        //userService.findByEmail((decoded as JwtPayload).email).then(user => {
        const user = await userService.findByEmail(decoded.email);
        req.user = user;
        next();
    });
}
export function ensureAuthViaQuery(req, res, next) {
    const { token } = req.query;
    if (!token)
        return res.status(401).json({
            message: 'Não autorizado: nenhum token foi encontrado.'
        });
    if (typeof token !== 'string')
        return res.status(400).json({
            message: 'O parâmetro token deve ser do tipo string.'
        });
    jwtService.verify(token, async (err, decoded) => {
        if (err || typeof decoded === 'undefined')
            return res.status(401).json({
                message: 'Não autorizado: token inválido.'
            });
        const user = await userService.findByEmail(decoded.email);
        req.user = user;
        next();
    });
}
