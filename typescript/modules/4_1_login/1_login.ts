//Router
const router = require('../0_1_general/0_router');
//Firebase login
const firebaselogin = require('./4_firebaselogin');



//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//
//°°°°°°°°°°  ROUTERS  °°°°°°°°°°//



//°°°°°°°°°°  INDEX  °°°°°°°°°°//
router.get('/login', async (req:any,res:any) =>{
    //vista
    res.render('index');
});





//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//
//°°°°°°°°°°  EXPORTAR - APP.JS  °°°°°°°°°°//
//module.exports = router;
export {router};
module.exports = router;