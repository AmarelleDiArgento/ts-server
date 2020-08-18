import { Schema, model, Document } from 'mongoose';


const imagenSchema = new Schema({
    nombre: {
        unique: true,
        type: String,
    }
});

export interface IImagen extends Document {
    nombre: string
}


export const Imagen = model<IImagen>('Imagen', imagenSchema);