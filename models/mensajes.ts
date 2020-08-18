import { Schema, model, Document } from 'mongoose';


const mensajeSchema = new Schema({
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

mensajeSchema.pre<IMensaje>('save', function (next) {
    this.creado = new Date();
    next();
})

export interface IMensaje extends Document {
    creado: Date;
    email: string;
    contenido: string;
}


export const Usuario = model<IMensaje>('Mensaje', mensajeSchema);