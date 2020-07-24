//°°°°°°°° Conexion Firebase °°°°°°°°//
const db = require('../0_1_general/1_firebaseconnection');



//°°°°°°°°°°   Nuevo usuario  °°°°°°°°°°°//
module.exports.nuevousuario = async (datos:any) =>{
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
interface Datoos1{
    Id: any,
    Datos: any
}


module.exports.listardatos1 = async () => {
    let dattos: Datoos1;

    let data:any[] = [];
    
    //Consulta
    await db.collection('test1').get()
    .then((snapshot:any) => {
        snapshot.forEach((doc:any) => {
            //console.log(doc.id, '=>', doc.data());
            dattos = {
                Id: doc.id,
                Datos: doc.data()
            }
            data.push(dattos);
        });
    })
    .catch((err:any) => {
        console.log('Error getting documents', err);
    });
    //retornar datos
    return data;

}


//°°°°°°°° Borrar datos °°°°°°°°//
module.exports.borrardato = async (id:any) =>{
    await db.collection('test1').doc(id).delete();
    console.log("eliminado");
}



//°°°°°°°° Mensaje Bienvenida °°°°°°°°//
console.log("Firebase Index iniciada");
