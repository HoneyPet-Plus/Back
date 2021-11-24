const Proveedor = require('../models/Proveedores.models')
const Usuario = require('../models/Usuarios.models')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

module.exports = class ProveedorController{
    
    static async getAllProveedores(request, response) {
        try {
          const result = await Proveedor.find({});
          response.status(200).json(result);
        } catch (err) {
          response.status(404).json({ message: err.message });
        }
    }

    static async getProveedoresById(request, response) {
        try {
          const id = request.params.id;
          const result = await Proveedor.findOne({ _id: id });
          if (result != null) {
            response.status(200).json(result);
          } else {
            response.status(400).json({mensaje: 'El proveedor no existe'});
          }
        } catch (err) {
          response.status(404).json({ message: err.message });
        }
    }

    static async createProveedor(req,res){

        try {    
            const {contacto_id, nombre_empresa,eslogan,descripcion_corta,descripcion_empresa,imagen_destacada,color_tema,telefono,direccion,email,horario_atencion,ubicacion_mapa,productos} = req.body;
          
            const nuevoProveedor = new Proveedor({
              contacto_id: contacto_id, 
              nombre_empresa: nombre_empresa,
              eslogan: eslogan,
              descripcion_corta: descripcion_corta,
              descripcion_empresa: descripcion_empresa,
              imagen_destacada: imagen_destacada,
              color_tema: color_tema,
              telefono: telefono,
              direccion:direccion,
              email: email,
              horario_atencion: horario_atencion,
              ubicacion_mapa: ubicacion_mapa,
              productos: productos
            })
  
            console.log("arriba")

            await nuevoProveedor.save()

            const usuario = await Usuario.findOne({ _id:contacto_id});
            
            if(usuario == null){
              res.status(400).json({
                mensaje:"El usuario no existe"
              });
            }else{
              await usuario.updateOne({ negocio_id: nuevoProveedor._id});
            }

            res.status(201).json(nuevoProveedor);

        } catch (error) {
            res.status(400).json(error);
        }
    }


    static async updateProveedorById(req,res){

      try {

        const id = request.params.id;
        const info = req.body;
      
        const proveedor = await Proveedor.findOne({_id:id})
        if(proveedor == null){
          res.json({
                  mensaje: 'El proveedor no existe'
          })
        }else{
  
          await Proveedor.updateOne({ _id: id }, info);
          response.status(201).json({
                mensaje: "El proveedor ha sido actualizado"
          });
        }

      } catch (error) {
          res.status(400).json(error);
      }
    }

    static async añadirFavoritos(req,res){

      try {

        const id = request.params.id;
        const info = req.body;
      
        const proveedor = await Proveedor.findOne({_id:id})
        if(proveedor == null){
          res.json({
                  mensaje: 'El proveedor no existe'
          })
        }else{
  
          await Proveedor.updateOne({ _id: id }, info);
          response.status(201).json({
                mensaje: "El proveedor ha sido actualizado"
          });
        }

      } catch (error) {
          res.status(400).json(error);
      }
  }

    static async deleteProveedorById(request, response) {
        try {
          const id = request.params.id;
          await Proveedor.deleteOne({ _id: id });
          response.status(200).json({mensaje: 'El proveedor ha sido eliminado'});
        } catch (err) {
          response.status(400).json({ message: err.message });
        }
    }
}