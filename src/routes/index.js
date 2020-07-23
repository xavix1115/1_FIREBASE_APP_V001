const { Router }= require('express');
const router = Router();


// Firebase new user
const firebaseusers = require('../firebase/4_firebaseusers');
// Firebase test1
const firebasetest1 = require('../firebase/4_firebasetest1');


//°°°°°°°°°°  INDEX  °°°°°°°°°°//
router.get('/', async (req,res) =>{
    //consulta
    var datos1 = await firebasetest1.listardatos1();
    //vista
    res.render('index', {contacts: datos1});
});



//°°°°°°°° NEW CONTACT °°°°°°°°//
router.post('/new-contact', async  (req,res) =>{
    //obtener datos
    console.log(req.body);
    const newcontact = {
        Nombre: req.body.firstname,
        Apellidos: req.body.lastname,
        Email: req.body.email,
        Telefono: req.body.phone
    }
    //Guardar
    await firebaseusers.nuevousuario(newcontact);
    //redireccionar
    res.redirect('/');
});


//°°°°°°°°°°  ERASE CONTACT °°°°°°°°°°//
router.get('/delete-contact/:id', async (req,res) =>{
    //Borrar datos
    await firebasetest1.borrardato(req.params.id);
    //Redireccionar
    res.redirect('/');
});






//°°°°°°°°°°  EXPORTAR - APP.JS  °°°°°°°°°°//
module.exports = router;