import { Router, Request, Response } from 'express';
import { Usuario, IUsuario } from '../models/usuario';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Token from '../modules/token';
import { verificarToken } from '../middelwares/autenticacion';


const usuarioRouter = Router();

// crear usuario 
usuarioRouter.post('/crear', (req: Request, res: Response) => {

  const body = req.body;

  const usuario = {
    user: body.user,
    nombre: body.nombre,
    email: body.email,
    password: bcryptjs.hashSync(body.password, 10)
  }

  // registrar el usuario 
  Usuario.create(usuario)
    .then(usuBD => {
      res.json({
        ok: true,
        usuario: usuBD
      });

      console.log(usuBD);
    })
    .catch(err => {
      res.json({
        ok: false,
        err
      });
    });
});

// crear usuario 
usuarioRouter.post('/entrar', (req: Request, res: Response) => {
  const body = req.body;
  Usuario.findOne({ user: body.user }, (err, usuBD) => {
    if (err) throw err;
    if (!usuBD) {
      return res.json({
        ok: false,
        mensaje: 'Datos invalidos'
      });
    }
    if (usuBD.validarPassword(body.password)) {

      const token = Token.optenerToken({
        _id: usuBD._id,
        nombre: usuBD.nombre,
        password: usuBD.password
      });

      jwt.decode

      return res.json({
        ok: true,
        token: token
      });

    } else {
      return res.json({
        ok: false,
        mensaje: 'Datos invalidos'
      });

    }
  })

});

// Actualizar mi usuario metodo RE chimbo xD
usuarioRouter.put('/:id', verificarToken, (req: any, res: Response) => {


  const body = req.body;
  const id = req.params.id;

  OptenerUno(id)
    .then((usuario) => {
      if (usuario) {

        return res.json({
          ok: true,
          usuario: usuario
        });

      }

    }).catch(() => {
      return res.json({
        ok: false,
        mensaje: 'Invalid data Catch'
      });
    });

});

// Actualizar mi usuario metodo RE chimbo xD
usuarioRouter.post('/:id', verificarToken, (req: any, res: Response) => {


  const body = req.body;
  const id = req.params.id;

  OptenerUno(id)
    .then((usuario) => {
      if (usuario) {

        const usuarioUpd = {
          user: (body.user) ? body.user : usuario.user,
          nombre: body.nombre || usuario.nombre,
          email: body.email || usuario.email,
          password: (body.password) ? bcryptjs.hashSync(body.password, 10) : usuario.password
        }

        Usuario.findByIdAndUpdate(usuario._id, usuarioUpd, { new: true }, (err, userUpd) => {

          if (err) throw err;
          if (!userUpd) {
            return res.json({
              ok: false,
              mensaje: 'Invalid data'
            });

          }
          res.json({
            ok: true,
            usuario: userUpd
          });
        });
      }



    }).catch(() => {
      res.json({
        ok: false,
        mensaje: 'Invalid data'
      });

    });

});
// Get usuario
usuarioRouter.get('/', async (req: any, res: Response) => {

  const users = await Usuario.find()
    //.limit(1) // Limit es para el número de usuarios que queremos obtener
    .exec();

  res.json({
    ok: true,
    users
  });
});


usuarioRouter.delete('/:id', verificarToken, (req: any, res: Response) => {
  const id: string = req.params.id;

  Usuario.findByIdAndRemove(id, (err, userDel) => {

    if (err) return res.json({
      ok: true,
      mensaje: 'Invalid data',
      error: err
    });
    if (!userDel) {
      return res.json({
        ok: false,
        mensaje: 'Invalid data'
      });

    }
    return res.json({
      ok: true,
      usuario: userDel
    });

  })
});

async function OptenerUno(id: string) {
  return Usuario.findById(id);
};

export default usuarioRouter;
