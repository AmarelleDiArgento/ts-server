"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./modules/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const imagenes_1 = __importDefault(require("./routes/imagenes"));
const server = new server_1.default();
// body parser 
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// carar archivos :D
server.app.use(express_fileupload_1.default());
// cors :D
server.app.use(cors_1.default());
// rutas :D
server.app.use('/usuario', usuario_1.default);
server.app.use('/imagenes', imagenes_1.default);
// conectar bd mongodb
mongoose_1.default.connect('mongodb://localhost:27017/pruebas', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err)
        throw 'err';
    console.log('Mongo DB: Online :D');
});
server.start(() => {
    console.log(`Servidor corriendo en el puerto: ${server.port} :D `);
});
