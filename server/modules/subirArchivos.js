"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class SubirArchivos {
    constructor() { }
    ;
    guardarImagen(archivo, carpeta) {
        return new Promise((resolve, reject) => {
            // Crear carpeta 
            const path = this.crearCarperta(carpeta);
            // Nombre del archivo
            const archivoNombre = `${archivo.md5}.${this.extencion(archivo.name)}`;
            // Mover el archivo a la carpeta destino
            archivo.mv(`${path}/${archivoNombre}`, (error) => {
                (error) ? reject() : resolve(archivoNombre);
            });
        });
    }
    crearCarperta(carpeta) {
        const pathLocal = path_1.default.resolve(__dirname, '../uploads/', carpeta);
        const existe = fs_1.default.existsSync(pathLocal);
        if (!existe) {
            fs_1.default.mkdirSync(pathLocal);
        }
        return pathLocal;
    }
    extencion(nombre) {
        let n = nombre.split('.');
        return n[1];
    }
    optenerImgUrl(img, carpeta) {
        return path_1.default.resolve(__dirname, '../uploads', carpeta, img);
    }
}
exports.default = SubirArchivos;
