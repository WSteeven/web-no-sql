const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');


//Connection database
mongoose.connect('mongodb://localhost:27017/usuarios', { useNewUrlParser: true, useUnifiedTopology:true })
    .then(db => console.log('Conexión exitosa a la base de datos "usuarios"'))
    .catch(err =>console.log(err));

    
//settings
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//static files
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));

//importing routes
const indexRoutes = require('./routes/index');

//routes
app.use('/', indexRoutes);



app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
})