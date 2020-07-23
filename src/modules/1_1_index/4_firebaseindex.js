//°°°°°°°° Conexion Firebase °°°°°°°°//
const db = require('../0_1_general/1_firebaseconnection');



//°°°°°°°°°°   Nuevo usuario  °°°°°°°°°°°//
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


//°°°°°°°° Listar datos °°°°°°°°//
module.exports.listardatos1 = async () => {
    var dattos = [];
    var data = [];
    
    //Consulta
    await db.collection('test1').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            //console.log(doc.id, '=>', doc.data());
            dattos = {
                Id: doc.id,
                Datos: doc.data()
            }
            data.push(dattos);
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
    //retornar datos
    return data;

}


//°°°°°°°° Borrar datos °°°°°°°°//
module.exports.borrardato = async (id) =>{
    await db.collection('test1').doc(id).delete();
    console.log("eliminado");
}



//°°°°°°°° Mensaje Bienvenida °°°°°°°°//
console.log("Firebase user inicializada2");
