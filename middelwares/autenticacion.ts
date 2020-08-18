import { Response, NextFunction } from 'express';
import Token from '../modules/token';

export const verificarToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.get('token') || '';

    Token.comprobarToken(token)
        .then((decoded: any) => {
            req.usuario = decoded.usuario;
            next();
        })
        .catch((err) => {
            res.json({
                ok: true,
                mensaje: 'Token invalido',
                err
            });
        });
}