"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../models/usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../modules/token"));
const autenticacion_1 = require("../middelwares/autenticacion");
const usuarioRouter = express_1.Router();
// crear usuario 
usuarioRouter.post('/crear', (req, res) => {
    const body = req.body;
    const usuario = {
        user: body.user,
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs_1.default.hashSync(body.password, 10)
    };
    // registrar el usuario 
    usuario_1.Usuario.create(usuario)
        .then(usuBD => {
        res.json({
            ok: true,
            usuario: usuBD
        });
        console.log(usuBD);
    })
        .catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// crear usuario 
usuarioRouter.post('/entrar', (req, res) => {
    const body = req.body;
    usuario_1.Usuario.findOne({ user: body.user }, (err, usuBD) => {
        if (err)
            throw err;
        if (!usuBD) {
            return res.json({
                ok: false,
                mensaje: 'Datos invalidos'
            });
        }
        if (usuBD.validarPassword(body.password)) {
            const token = token_1.default.optenerToken({
                _id: usuBD._id,
                nombre: usuBD.nombre,
                password: usuBD.password
            });
            jsonwebtoken_1.default.decode;
            return res.json({
                ok: true,
                token: token
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Datos invalidos'
            });
        }
    });
});
// Actualizar mi usuario metodo RE chimbo xD
usuarioRouter.put('/:id', autenticacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const id = req.params.id;
    OptenerUno(id)
        .then((usuario) => {
        if (usuario) {
            return res.json({
                ok: true,
                usuario: usuario
            });
        }
    }).catch(() => {
        return res.json({
            ok: false,
            mensaje: 'Invalid data Catch'
        });
    });
});
// Actualizar mi usuario metodo RE chimbo xD
usuarioRouter.post('/:id', autenticacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const id = req.params.id;
    OptenerUno(id)
        .then((usuario) => {
        if (usuario) {
            const usuarioUpd = {
                user: (body.user) ? body.user : usuario.user,
                nombre: body.nombre || usuario.nombre,
                email: body.email || usuario.email,
                password: (body.password) ? bcryptjs_1.default.hashSync(body.password, 10) : usuario.password
            };
            usuario_1.Usuario.findByIdAndUpdate(usuario._id, usuarioUpd, { new: true }, (err, userUpd) => {
                if (err)
                    throw err;
                if (!userUpd) {
                    return res.json({
                        ok: false,
                        mensaje: 'Invalid data'
                    });
                }
                res.json({
                    ok: true,
                    usuario: userUpd
                });
            });
        }
    }).catch(() => {
        res.json({
            ok: false,
            mensaje: 'Invalid data'
        });
    });
});
// Get usuario
usuarioRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield usuario_1.Usuario.find()
        //.limit(1) // Limit es para el número de usuarios que queremos obtener
        .exec();
    res.json({
        ok: true,
        users
    });
}));
usuarioRouter.delete('/:id', autenticacion_1.verificarToken, (req, res) => {
    const id = req.params.id;
    usuario_1.Usuario.findByIdAndRemove(id, (err, userDel) => {
        if (err)
            return res.json({
                ok: true,
                mensaje: 'Invalid data',
                error: err
            });
        if (!userDel) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        return res.json({
            ok: true,
            usuario: userDel
        });
    });
});
function OptenerUno(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return usuario_1.Usuario.findById(id);
    });
}
;
exports.default = usuarioRouter;
