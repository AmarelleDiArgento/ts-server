import path from 'path';
import fs from 'fs';

export default class SubirArchivos {
    constructor() { };


    guardarImagen(archivo: any, carpeta: string) {

        return new Promise((resolve, reject) => {
            // Crear carpeta 
            const path = this.crearCarperta(carpeta);

            // Nombre del archivo
            const archivoNombre = `${archivo.md5}.${this.extencion(archivo.name)}`;

            // Mover el archivo a la carpeta destino
            archivo.mv(`${path}/${archivoNombre}`, (error: any) => {
                (error) ? reject() : resolve(archivoNombre);
            })

        })
    }

    private crearCarperta(carpeta: string) {
        const pathLocal = path.resolve(__dirname, '../uploads/', carpeta);

        const existe = fs.existsSync(pathLocal);

        if (!existe) {
            fs.mkdirSync(pathLocal)
        }

        return pathLocal;
    }

    private extencion(nombre: string) {

        let n = nombre.split('.');

        return n[1];

    }

    optenerImgUrl(img: string, carpeta: string) {
        return path.resolve(__dirname, '../uploads', carpeta, img);
    }


}