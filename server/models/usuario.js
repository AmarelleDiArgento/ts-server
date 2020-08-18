"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarioSchema = new mongoose_1.Schema({
    user: {
        type: String,
        unique: true,
        required: [true, 'El usuario es necesario']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    }
});
usuarioSchema.method('validarPassword', function (pass = '') {
    return bcryptjs_1.default.compareSync(pass, this.password);
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
