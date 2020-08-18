import { Router, Request, Response } from 'express';
import { verificarToken } from '../middelwares/autenticacion';
import { Imagen } from '../models/imagenes';
import SubirArchivos from '../modules/subirArchivos';


const imagenesRouter = Router();
const subirArchivos = new SubirArchivos();
const carpeta = 'imagenes'

// crear usuario 
imagenesRouter.post('/', verificarToken, (req: any, res: Response) => {
  const body = req.body;

  const file = req.files.img;
  body.nombre = file.name;
  console.log(file);
  console.log(carpeta);



  subirArchivos.guardarImagen(file, carpeta)
    .then((archivo) => {

      console.log(archivo);

      Imagen.create({ nombre: archivo as string }).then((img) => {
        res.json({
          ok: true,
          img
        });

      }).catch((error) => {
        console.log(error);

        res.json({
          error
        });
      });


    })
    .catch((error) => {

      res.json({
        ok: false,
        mensaje: 'Error file',
        error
      });
    });



});

imagenesRouter.get('/:img', verificarToken, (req: any, res: Response) => {
  const imagen = req.params.img;
  const imagenPath = subirArchivos.optenerImgUrl(imagen, carpeta);
  res.sendFile(imagenPath);
})


export default imagenesRouter;