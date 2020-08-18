"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const mensajeSchema = new mongoose_1.Schema({
    creado: {
        type: Date,
    },
    email: {
        type: String,
        required: [true, 'El email es necesario']
    },
    contenido: {
        type: String,
        required: [true, 'El contenido es necesario']
    }
});
mensajeSchema.pre('save', function (next) {
    this.creado = new Date();
    next();
});
exports.Usuario = mongoose_1.model('Mensaje', mensajeSchema);
