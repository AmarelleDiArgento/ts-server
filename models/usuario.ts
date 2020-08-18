import { Schema, model, Document } from 'mongoose';

import bcryptjs from 'bcryptjs';

const usuarioSchema = new Schema({
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


usuarioSchema.method('validarPassword', function (pass: string = ''): boolean {
    return bcryptjs.compareSync(pass, this.password);
});

export interface IUsuario extends Document {
    user: string;
    nombre: string;
    email: string;
    password: string;
    validarPassword(password: string): boolean;
}


export const Usuario = model<IUsuario>('Usuario', usuarioSchema);