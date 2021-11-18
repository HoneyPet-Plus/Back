//creamos nuestra db
const mongoose = require('mongoose');

URI=('mongodb://localhost/dbHoneypetPlus')

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(db => console.log('Connected to database', db.connection.name))
.catch(err => console.log(err))

module.exports = mongoose
