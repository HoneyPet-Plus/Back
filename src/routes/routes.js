const {Router} = require('express')
const router = Router()
const usuarioController = require('../controllers/Usuario.controller')

router.post('/usuarios/create', usuarioController.createUsuario)
router.post('/usuarios/login', usuarioController.login)



module.exports = router