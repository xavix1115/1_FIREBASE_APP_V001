




function proyectonuevo(){
  
  
  generarcontraseña()
  .then( a =>{
      return generarcalve();
  }).then( a2 =>{
      return obtenerdatos1();
  }).then( a2 =>{
      return subirdatostabla1();
  }).then( a3 =>{
      return subirdatostabla2();
  }).then( a4 =>{
      limpiarproyecto();
      textcreado();
  }).catch( Error =>{
      console.log("ERROR! " + Error);
  });
  
  
}


/*=========================================================*/
  //CONSTRUCTOR ALMACENA DATOS
/*=========================================================*/
function Proyecto(contraseñaM, contraseñaV, claveM, idRef1 ){
  this.CNT1 = contraseñaM;
  this.CNT2 = contraseñaV;
  this.CLV = claveM;
  this.IDREF = idRef1;
}
/* DECLARAR VARIABLE */
PRY = new Proyecto("0", "0", "0", "0");



/*=========================================================*/
  //SUBIR DATOS TABLA 2
/*=========================================================*/
const subirdatostabla2 = () =>{
  return new Promise((res, err) =>{
    //Subir datos
    db.collection("proyectos").add({
      Seccion: Dseccion,
      IDproyecto: Didproyecto,
      Departamento: Ddepartamento,
      Municipio: Dmunicipio,
      Direccion: Ddireccion,
      Representante: Drepresentante,
      Telefono: Dtelefono,
      Correo: Dcorreo,
      Comentario: Dcomentario,
      ClaveM: PRY.CLV,
      ContraseñaM: PRY.CNT1,
      ClaveV: PRY.CLV,
      ContraseñaV: PRY.CNT2,
      IDRef: PRY.IDREF,
      FechaCreacion: fechactual
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      res(true);
    })
    .catch(function(error) {
      console.log("Error adding document: ", error);
    });
  });
}


/*=========================================================*/
  //SUBIR DATOS TABLA 1
/*=========================================================*/
const subirdatostabla1 = () =>{
  return new Promise((res, err)=>{
    //Subir datos
    db.collection("proyectosE").add({
      Clave: PRY.CLV,
      Masters: "0",
      MastersMax: "1"
    })
    .then(function(docRef) {
      //Guarda datos
      res(docRef.id);
      PRY = new Proyecto(PRY.CNT1, PRY.CNT2, PRY.CLV, docRef.id);
    })
    .catch(function(error) {  console.log("Error adding document: ", error);  err(error); });
  })
}


/*=========================================================*/
/* --- OBTENER DATOS ---*/
/*=========================================================*/
const obtenerdatos1 = () =>{
     return new Promise((resolve, error)=>{
      Dseccion = document.getElementById('seccion').value;
      Didproyecto = document.getElementById('idproyecto').value;
      Ddepartamento = document.getElementById('departamento').value;
      Dmunicipio = document.getElementById('municipio').value;
      Ddireccion = document.getElementById('direccion').value;
      Drepresentante = document.getElementById('representante').value;
      Dtelefono = document.getElementById('telefono').value;
      Dcorreo = document.getElementById('correo2').value;
      Dcomentario = document.getElementById('comentario').value;
      DclaveM = PRY.CLV;
      DcontraseñaM = PRY.CNT1;
      DclaveV = PRY.CLV;
      DcontraseñaV = PRY.CNT2;
      //Fecha
      fecha = new Date();
      año = fecha.getFullYear().toString();
      mes = (fecha.getMonth() + 1).toString();
      dia = fecha.getDate().toString();
      if (mes < 10){mes = "0" + mes;}
      if (dia < 10){ dia = "0" + dia;}
      fechactual = año +"/"+mes+"/"+dia;
      resolve(true);
     });
}


/*=========================================================*/
/* --- GENERADOR DE CLAVES ---*/
/*=========================================================*/
const generarcalve = () =>{
  return new Promise((resolve, error) =>{
      var clave = '';
      var fecha = new Date();
      var año = fecha.getFullYear().toString();
      var mes = (fecha.getMonth() + 1).toString();
      var dia = fecha.getDate().toString();
      var minutos = fecha.getMinutes().toString();
      var segundos = fecha.getSeconds().toString();
      var a = año.substr(2,3);
      try{
        if (mes < 10){mes = "0" + mes;}
        if (dia < 10){ dia = "0" + dia;}
        if (minutos < 10){ minutos = "0" + minutos;}
        if (segundos < 10){ segundos = "0" + segundos;}
        //Concatenar
        clave = a + "7" + mes + "8" + dia + "9" + minutos + segundos;
        //Colocar texto
        document.getElementById('clavetextV').innerHTML = '';
        document.getElementById('clavetext').innerHTML = '';
        document.getElementById('clavetext').innerHTML = clave;
        document.getElementById('clavetextV').innerHTML = clave;
        //Guardar Datos
        PRY = new Proyecto(PRY.CNT1, PRY.CNT2, clave, "0");
        resolve(true);
      }catch(error1){  error(error1);  }
  });
}



/*=========================================================*/
/* --- GENERADOR DE CONTRASEÑAS ---*/
/*=========================================================*/
const generarcontraseña = () =>{
  return new Promise((resolve, error)=>{
    
    var contraseñaM='';  var contraseñaV='H5BZX6QR';
    var caracteres = '0 1 2 3 4 5 6 7 8 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'
    var largocontraseña = 8;
    /*Quitar espacios al principio y final*/
      caracteres = caracteres.trim();
    /*Colocarlo en u array*/
    caracteres = caracteres.split(' ');
    //PROMESA
    let cntr =  new Promise((Resuelto,Error) => {
      try{
        //Generar contraseña
        for (var i = 0; i < largocontraseña; i++){
          contraseñaM += caracteres[Math.floor(Math.random() * caracteres.length)];
        }
        //Colocar texto
        document.getElementById('contraseñatext').innerHTML= '';
        document.getElementById('contraseñatextV').innerHTML= '';
        document.getElementById('contraseñatext').innerHTML= contraseñaM;
        document.getElementById('contraseñatextV').innerHTML= contraseñaV;
        
        Resuelto("Contraseñas generadas");
      }catch(error){  Error(error);  }
    });
    //VER SI NO HUBO ERROR
    Promise.all([cntr]).then((resueltos) =>{
      //GUARDAR DATOS
      PRY = new Proyecto(contraseñaM, contraseñaV, "0", "0");
      resolve(true);
    }).catch((error1) =>{
      alert("ERROR: | " + error1);
      error(error1);
    }); 
  });
}






function textcreado(){
    document.getElementById('mensajetxt').innerHTML = '';
    document.getElementById('mensajetxt').innerHTML = '<div class="row m-0 m-b-40"><div class="col-lg-12 col-md-12">'+
    '<div class="alert alert-success font-16">Usuario Creado exitosamente'+
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
    '<i class="mdi mdi-close font-18"></i>'+
    '</button></div></div></div><div class="row m-t-40"></div>';
    document.getElementById('mensajes').classList.remove('invisible');
    document.getElementById('mensajes').classList.add("visible");
}


function limpiarproyecto(){
  document.getElementById('seccion').value = "@";
  document.getElementById('idproyecto').value = "";
  document.getElementById('departamento').value = "Seleccione uno";
  document.getElementById('municipio').value = "";
  document.getElementById('direccion').value = "";
  document.getElementById('representante').value = "";
  document.getElementById('telefono').value = "";
  document.getElementById('correo2').value = "";
  document.getElementById('comentario').value = "";
  document.getElementById('contraseñatext').value = "--";
  document.getElementById('contraseñatextV').value = "--";
  document.getElementById('clavetext').value = "--";
  document.getElementById('clavetextV').value = "--";
}





function busquedad1(){

  db.collection("users1").where("CalveM", "==", "2070681893751").limit(1)
  .get()
  .then(function(querySnapshot) {
      console.log("algo");
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log("iD: " + doc.id);
        console.log("Representante " + doc.data().Representante);
      });

      
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });



}





function actualizar1(){
  
// Create an initial document to update.
var frankDocRef = db.collection("users1").doc("6PswAMUyDkfY2quffx1z");
frankDocRef.update({
    date: "hoy2",
    otor: "hola2",
    upa: "genial2"
}).then(function(docRef) {
  console.log("hola");
})
.catch(function(error) {
  console.log("Error adding document: ", error);
});

    

}


function borrar1(){
    
// Borra CAMPOS
var frankDocRef = db.collection("users1").doc("6PswAMUyDkfY2quffx1z");
frankDocRef.update({
    date: firebase.firestore.FieldValue.delete(),
    otor: firebase.firestore.FieldValue.delete(),
    upa: firebase.firestore.FieldValue.delete()
}).then(function(docRef) {
  console.log("borrado");
})
.catch(function(error) {
  console.log("Error adding document: ", error);
});

}




function test2(){
  


  
}