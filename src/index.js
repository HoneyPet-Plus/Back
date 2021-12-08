//Requerimos las dependencias necesarias
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./database')

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(__dirname + '/site/'))
//     app.use('*',(req,res)=>{
//       res.sendFile(__dirname + '/site/index.html')
//     })
// }

//Configuración del puerto
app.set('Port', process.env.PORT || 4000);

app.use(express.static(__dirname + '/site/'))
app.use('*',(req,res)=>{
    res.sendFile(__dirname + '/site/index.html')
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origen: '*'}));

app.use('/api',require('./routes/routes'))

app.listen(app.get('Port'), function() {
    console.log('listening on port ' + app.get('Port'))
});

