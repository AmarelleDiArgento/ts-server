"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const token_1 = __importDefault(require("../modules/token"));
exports.verificarToken = (req, res, next) => {
    const token = req.get('token') || '';
    token_1.default.comprobarToken(token)
        .then((decoded) => {
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
};
