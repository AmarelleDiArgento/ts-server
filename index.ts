import Server from "./modules/server";
import mongoose from 'mongoose';

import usuarioRouter from './routes/usuario';
import bodyParser from 'body-parser';
import cors from 'cors';

import fileupload from 'express-fileupload';
import imagenesRouter from "./routes/imagenes";

const server = new Server();

// body parser 
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// carar archivos :D
server.app.use(fileupload());


// cors :D

server.app.use(cors());
// rutas :D
server.app.use('/usuario', usuarioRouter);
server.app.use('/imagenes', imagenesRouter);

// conectar bd mongodb
mongoose.connect(
    'mongodb://localhost:27017/pruebas',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) throw 'err';
        console.log('Mongo DB: Online :D');

    }
)

server.start(() => {
    console.log(`Servidor corriendo en el puerto: ${server.port} :D `)
})

