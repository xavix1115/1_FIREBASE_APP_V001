//°°°°°°°° Conexion Firebase °°°°°°°°//
const db = require('./1_firebaseconnection');



//°°°°°°°°°°   Funciones   °°°°°°°°°°°//
module.exports.nuevousuario = async (datos) =>{
    //firebase guarda los datos
    const res = await db.collection('test1').add({
        Nombres: datos.Nombre,
        Apellidos: datos.Apellidos,
        Email: datos.Email,
        Telefono: datos.Telefono
    });
    console.log('Added document with ID: ', res.id);
}


//°°°°°°°° Mensaje Bienvenida °°°°°°°°//
console.log("Firebase user inicializada");
