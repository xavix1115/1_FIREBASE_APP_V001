//°°°°°°°° Conexion Firebase °°°°°°°°//
const db = require('./1_firebaseconnection');




//°°°°°°°° Mensaje Bienvenida °°°°°°°°//
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



module.exports.borrardato = async (id) =>{
    await db.collection('test1').doc(id).delete();
    console.log("eliminado");
}


//°°°°°°°° Mensaje Bienvenida °°°°°°°°//
console.log("Firebase Test1 inicializada");