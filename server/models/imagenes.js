"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imagen = void 0;
const mongoose_1 = require("mongoose");
const imagenSchema = new mongoose_1.Schema({
    nombre: {
        unique: true,
        type: String,
    }
});
exports.Imagen = mongoose_1.model('Imagen', imagenSchema);
