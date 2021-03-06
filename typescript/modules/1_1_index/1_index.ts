//Router
const router = require('../0_1_general/0_router');
// Firebase new user
const firebaseusers = require('./4_firebaseindex');


//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//
//°°°°°°°°°°  ROUTERS  °°°°°°°°°°//



//°°°°°°°°°°  INDEX  °°°°°°°°°°//
router.get('/', async (req:any,res:any) =>{
    //consulta
    var datos1 = await firebaseusers.listardatos1();
    //vista
    res.render('index', {contacts: datos1});
});



//°°°°°°°° NEW CONTACT °°°°°°°°//
router.post('/new-contact', async  (req:any,res:any) =>{
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
router.get('/delete-contact/:id', async (req:any,res:any) =>{
    //Borrar datos
    await firebaseusers.borrardato(req.params.id);
    //Redireccionar
    res.redirect('/');
});





//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//
//°°°°°°°°°°  EXPORTAR - APP.JS  °°°°°°°°°°//
export { router }
module.exports = router;
