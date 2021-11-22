const Usuario = require('../models/Usuarios.models')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')

module.exports = class UsuariosController{
    
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
                usuario
            })
        }else{

            res.json({
                mensaje: 'Contraseña incorrecta'
            })
        }
    }
}


