//const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', (req, res)=>{
    res.render('index'); 
});

//login view
router.get('/login', (req, res)=>{
    var message = '';
    res.render('login', {message});
})
router.post('/login', async(req, res)=>{
    console.log(req.body);

    const user = await User.findOne({email: req.body.email, password: req.body.password}, (err, data)=>{
        if(err) console.log('No se encontró registro coincidente');
        console.log('Qué tenemos aquí\n'+data);
    });
    console.log(user);
    if(user){
        res.render('profile',{user})
    }else{
        var message='Correo o contraseña incorrecto, intenta nuevamente';
        res.render('login', {message})
    }
});

//register view
router.get('/register', (req, res)=>{
    var message='';
    res.render('register', {message});
})
router.post('/register', async(req, res)=>{
    const user = new User(req.body);
    const correoexite = await User.findOne({email: user.email}, (err, data)=>{
        if(err) console.log('Error al buscar el email');
            console.log('que hay aquí\n'+ data);
    });
    if(!correoexite){
        await user.save();
        res.redirect('/login'); //redicciona a la plantilla de logueo
    }else{
        var message = 'El correo ingresado ya está en uso, intenta con otro';
        res.render('register', {message});
    }
    
});

/*
//profile view
router.get('/profile', (req, res)=>{
    console.log(req);
    console.log('-------');
    console.log(req.body);
    res.render('profile', req);
})*/

//logout
router.get('/logout', (req, res)=>{
    res.redirect('/');
})

module.exports = router;

/*module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.render('index');
    });

}*/