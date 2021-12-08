const Auth = {}
const jwt = require('jsonwebtoken')


Auth.verificarToken = (req, res, next)=>{

    if(!req.headers.autorizacion){
        return res.json({
          mensaje: "No estas autorizado perro"  
        })
    }

    const token = req.headers.autorizacion

    if(token==null){
        return res.json({
            mensaje: "No estas autorizado"  
        })
    }

    jwt.verify(token, 'Secreta', (error,resultado)=>{
        if(error)
        return res.json({
            mensaje: "No estas autorizado"  
        })

        next();
    })
}

module.exports = Auth