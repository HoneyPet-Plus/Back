const mongoose = require('mongoose')
const {Schema}= mongoose

const ProveedorSchema = new Schema({

  "contacto_id" : String,
  "nombre_empresa" : { type : String ,  required : [ true ,  "El nombre del negocio es obligatorio." ]  } ,
  "eslogan" :  { type : String ,  required : [ true ,  "El eslogan es obligatorio." ]  } ,
  "descripcion_corta" :{ type : String ,  required : [ true ,  "La descripción corta es obligatoria." ]  } ,
  "descripcion_empresa" : { type : String ,  required : [ true ,  "La descripción  es obligatoria." ]  } ,
  "color_tema":{type : String , default:"gray" },
  "imagen_destacada" :  { type : String , default:"" },
  "telefono" :  { type : Number ,  required : [ true ,  "El teléfono es obligatorio." ]  } ,
  "direccion" :  { type : String ,  required : [ true ,  "La dirección es obligatoria." ]  } ,
  "email" :  { type : String ,  required : [ true ,  "El email es obligatorio." ]  } ,
  "horario_atencion" : { type : String }  ,
  "ubicacion_mapa" :  [{ type : String ,  required : [ true ,  "La ubicación en el mapa es obligatoria." ]  } ],
  "productos": Array
})

module.exports = mongoose.model('proveedores',ProveedorSchema)