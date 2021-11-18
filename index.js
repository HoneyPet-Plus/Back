const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./database')

//Configuración del puerto
app.set('Port', process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origen: '*'}));

app.listen(app.get('Port'), function() {
    console.log('listening on port ' + app.get('Port'))
});

