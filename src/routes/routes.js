const {Router} = require('express')
const router = Router()
const usuarioController = require('../controllers/Usuario.controller')
const proveedorController = require('../controllers/Proveedor.controller')
const Auth = require('../helper/Auth')

//Rutas Usuarios

router.get("/usuario/all"       , usuarioController.getAllUsuarios);
router.get("/usuario/id/:id"    , usuarioController.getUsuariosById);
router.post('/usuario/create'   , usuarioController.createUsuario)
router.post('/usuario/login'    , usuarioController.login)
router.delete("/usuario/id/:id"           ,Auth.verificarToken  , usuarioController.deleteUsuariosById);
router.put("/usuario/id/:id"              ,Auth.verificarToken  , usuarioController.updateUsuarioById);
router.post('/usuario/favoritos/:idu/:idp', usuarioController.añadirFavoritos);
router.post('/usuario/eliminar/favoritos/:idu/:idp'  ,  Auth.verificarToken, usuarioController.eliminarFavoritos)

//Rutas Proveedores

router.get("/proveedor/all"       , proveedorController.getAllProveedores);
router.get("/proveedor/id/:id"    , proveedorController.getProveedoresById);
router.post('/proveedor/create'   ,  Auth.verificarToken  , proveedorController.createProveedor)
router.put("/proveedor/id/:id"    ,   Auth.verificarToken, proveedorController.updateProveedorById);
router.delete("/proveedor/id/:idProv/:idUser" ,  Auth.verificarToken  , proveedorController.deleteProveedorById);




module.exports = router