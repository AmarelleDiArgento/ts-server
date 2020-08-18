"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middelwares/autenticacion");
const imagenes_1 = require("../models/imagenes");
const subirArchivos_1 = __importDefault(require("../modules/subirArchivos"));
const imagenesRouter = express_1.Router();
const subirArchivos = new subirArchivos_1.default();
const carpeta = 'imagenes';
// crear usuario 
imagenesRouter.post('/', autenticacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const file = req.files.img;
    body.nombre = file.name;
    console.log(file);
    console.log(carpeta);
    subirArchivos.guardarImagen(file, carpeta)
        .then((archivo) => {
        console.log(archivo);
        imagenes_1.Imagen.create({ nombre: archivo }).then((img) => {
            res.json({
                ok: true,
                img
            });
        }).catch((error) => {
            console.log(error);
            res.json({
                error
            });
        });
    })
        .catch((error) => {
        res.json({
            ok: false,
            mensaje: 'Error file',
            error
        });
    });
});
imagenesRouter.get('/:img', autenticacion_1.verificarToken, (req, res) => {
    const imagen = req.params.img;
    const imagenPath = subirArchivos.optenerImgUrl(imagen, carpeta);
    res.sendFile(imagenPath);
});
exports.default = imagenesRouter;
