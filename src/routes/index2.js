const { Router }= require('express');
const router = Router();


// Firebase new user
const firebaseusers = require('../firebase/4_firebaseusers');
// Firebase test1
const firebasetest1 = require('../firebase/4_firebasetest1');


//°°°°°°°°°°  INDEX  °°°°°°°°°°//
router.get('/home', async (req,res) =>{
    //consulta
    var datos1 = await firebasetest1.listardatos1();
    //vista
    res.render('index', {contacts: datos1});
});










//°°°°°°°°°°  EXPORTAR - APP.JS  °°°°°°°°°°//
module.exports = router;