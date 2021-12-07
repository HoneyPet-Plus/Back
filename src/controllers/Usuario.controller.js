const Usuario = require('../models/Usuarios.models')
const Proveedor = require('../models/Proveedores.models')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')

module.exports = class UsuariosController{
    
    static async getAllUsuarios(request, response) {
        try {
          const result = await Usuario.find({});
          response.status(200).json(result);
        } catch (err) {
          response.status(404).json({ message: err.message });
        }
    }

    static async getUsuariosById(request, response) {
        try {
          const id = request.params.id;
          const result = await Usuario.findOne({ _id: id });
          if (result != null) {
            response.status(200).json(result);
          } else {
            response.status(400).json({mensaje: 'El usuario no existe'});
          }
        } catch (err) {
          response.status(404).json({ message: err.message });
        }
    }

    static async createUsuario(req,res){

        try {    
            const {nombre,correo,contraseña,rol} = req.body;
            const NuevoUsuario = new Usuario({
                nombre,
                correo,
                contraseña,
                rol
            })
    
            const correoUsuario = await Usuario.findOne({correo:correo})
            if(correoUsuario){
                res.json({
                    mensaje: 'El correo ya fue registrado con anterioridad'
                })
            }else{
    
                NuevoUsuario.contraseña = await bcrypt.hash(contraseña,10)
                const token = jwt.sign({_id:NuevoUsuario._id},"Secreto")
                await NuevoUsuario.save()
    
                res.status(201).json(NuevoUsuario);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }

    static async deleteUsuariosById(request, response) {
        try {
          const id = request.params.id;
          await Usuario.deleteOne({ _id: id });
          response.status(200).json({mensaje: 'El usuario ha sido eliminado'});
        } catch (err) {
          response.status(400).json({ message: err.message });
        }
    }

    static async updateUsuarioById(request, response) {
        try {
          const id = request.params.id;
          const info = request.body;

          const correoUsuario = await Usuario.findOne({correo:info.correo})
          if(correoUsuario){
            response.json({
                  mensaje: 'El correo ya fue registrado con anterioridad'
              })
          }else{
  
            await Usuario.updateOne({ _id: id }, info);
            response.status(201).json({
                mensaje: "El usuario ha sido actualizado"
            });
          }
        } catch (err) {
          response.status(400).json({ message: err.message });
        }
    }

    static async login(req,res){

        const {correo,contraseña}= req.body
        const usuario = await Usuario.findOne({correo:correo})

        if(!usuario){
            return res.json({
                mensaje: 'Correo incorecto'
            })
        }

        const match = await bcrypt.compare(contraseña,usuario.contraseña)
        if(match){

            const token = jwt.sign({_id: usuario._id},'Secreta')
            res.json({
                mensaje: 'Bienvenidos',
                idUser: usuario._id,
                correo: usuario.correo,
                nombre: usuario.nombre,
                rol: usuario.rol,
                usuario,
                token
            })
        }else{

            res.json({
                mensaje: 'Contraseña incorrecta'
            })
        }
    }

    static async añadirFavoritos(req,res){

      try {

        const idUser = req.params.idu;
        const idProv = req.params.idp;
        

        const usuario = await Usuario.findOne({_id:idUser})
        const proveedor = await Proveedor.findOne({_id:idProv})
        
        if(usuario == null){
          res.status(400).json({
                  mensaje: 'El usuario no existe'
          })
        }else{
  
          if(proveedor == null){
            res.status(400).json({
              mensaje: 'El proveedor no existe'
            })
          }else{
            if(usuario.rol == 'Proveedor'){
              res.status(400).json({
                mensaje: 'El rol de tu cuenta no te permite tener favoritos'
              })
            }else{

              var flag = false;
              
              usuario.favoritos.forEach(element => {
              
                if(element.equals(proveedor._id)){
                  
                  flag = true;
                }
              });

              if(flag == true){
                
                res.status(201).json({
                  mensaje : 'El proveedor ya esta en tu lista de favoritos'
                })
              }else{
                usuario.favoritos = usuario.favoritos.concat(proveedor._id)
                await usuario.save()
              res.status(201).json({
                mensaje: 'El proveedor se añadió la lista de favoritos'
              })
              }

              
            }
          }
        }

      } catch (error) {
          res.status(400).json(error);
      }
  }

  static async eliminarFavoritos(req,res){

    try {

      const idUser = req.params.idu;
      const idProv = req.params.idp;
    
      const usuario = await Usuario.findOne({_id:idUser})
      const proveedor = await Proveedor.findOne({_id:idProv})

      
      if(usuario == null){
        res.status(400).json({
                mensaje: 'El usuario no existe'
        })
      }else{

        if(proveedor == null){
          res.status(400).json({
            mensaje: 'El proveedor no existe'
          })
        }else{
          
          var indice = -1

          for (let index = 0; index < usuario.favoritos.length; index++) {
            if (usuario.favoritos[index].equals(proveedor._id)) {
  
              indice = index
            }          
          }

          if(indice > -1){
            
            console.log(indice);
            usuario.favoritos.splice(indice,1)
            console.log(usuario.favoritos);
            await usuario.save()
            res.status(201).json({
              mensaje: 'El proveedor se eliminado de la lista de favoritos',

            })

          }else{
            res.status(201).json({
              mensaje: 'El proveedor no esta en tu lista de favoritos',
              usuario
            })
          }

          
        }
      }

    } catch (error) {
        res.status(400).json(error);
    }
  }
}


