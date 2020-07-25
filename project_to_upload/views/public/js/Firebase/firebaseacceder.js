
/*========================================*/
//VARIABLES GLOBALES
/*========================================*/
Tiempo = false;


/*========================================*/
/*========================================*/
//ACCEDER USUARIO
/*========================================*/
/*========================================*/
async function acceder(){
    //{A1}-OBTENER-DATOS
    await obtenerdatos().then(datasvacios =>{
        //{B1}-CONSULTA-CLAVE-EXISTENTE
            //TIEMPO-MAXIMO-EXCEDIDO
            setTimeout(() => {  if(Tiempo === true){  }else{ tiempomaximo(clave);  }  }, 4000);
        return consulataclave(clave);
    }).then(consultaclave1 =>{
        //{C1}-USUARIO-EXISTENTE
        return usuarioexistente(email, pass); 
    }).then(usuarioexiste =>{
        //{D1}-VALIDAR-USUARIO
            if (usuarioexiste === "REGISTRADO"){
                /*==>Redireccionar*/ redireccionardetalles();
            }
                //{E1}-CREAR-USUARIO
                if (usuarioexiste === "NUEVOUSUARIO"){ 
                    //{E2}-TIPO-DE-USUARIO
                    return tipodeusuario();
                }
    }).then(tipo =>{
            //Guardar-Tipo-de-Usuario
            Tipousuario = tipo;
        //{E3}-COMPROBAR CONTRASEÑA
        return proyectodatos1(clave);
    }).then(datosproyecto =>{
        //Validar-Segun-Tipo
        //TIPO-MASTER
        if (Tipousuario === "MASTER"){ 
            if (datosproyecto.ContraseñaM === pass){
                 //{H1}-CREAR-USUARIO
                 return crearusuario(email, pass);
            }else{ errormenaje = "La CONTRASEÑA ingresada no es correcta"; throw errormenaje; }
        }
        //TIPO-INVITADO
        if (Tipousuario === "INVITADO"){
            if (datosproyecto.ContraseñaV === pass){
                //{H1}-CREAR-USUARIO
                return crearusuario(email, pass);
            }else{ 
                //VER SI LA CONTRASEÑA NO ES MASTER
                if (pass === datosproyecto.ContraseñaM){
                    errormenaje = "USUARIOS con privilegios ya estan ocupados. Porfavor pedir AUMENTO DE USUARIO con Privilegios"; 
                }else{
                    errormenaje = "La CONTRASEÑA ingresada no es correcta"; 
                }  throw errormenaje; 
            }
        }
    }).then(crearusuario =>{
        if (crearusuario === true){
            if(Tipousuario === "MASTER"){
                //{G1}-AUMENTAR-NUMERO-DE-MASTERS
                var numerodemaster = parseInt(datosclave.Masters);  var claveid0 = claveid.toString();
                aumentarmaster1(numerodemaster, claveid0);
            }
            //{H1}-ACTULIZAR-NOMBRE-CON-DATOS
            return actualizarinfo1(clave, Tipousuario);
        }
    }).then(actualizar1 =>{
        if (actualizar1 === true){
            redireccionarverificar();
        }
    }).catch(error5 =>{
        alert("ERROR! | " + error5);
    });  
    
    
}

/*========================================*/








/*====================================================*/
    //TIEMPO_MAXIMO_EXCEDIDO_EN_BUSQUEDAD_DE_CLAVE
/*====================================================*/
const tiempomaximo = (clave2) => {
    //VARIABLE ERROR
    error1 = "";
    //OBTENER TAMAÑO TEXTO
    var clavetamaño = clave2.length;
    //VALIDAR TAMAÑO DE TEXTO
    if(clavetamaño < 13){ error1="La clave es muy pequeña"; }
    if(clavetamaño > 13){ error1="La clave es muy grande"; }
    if(clavetamaño === 13){ error1="La clave ingresada es incorrecta"; }
    alert(error1);
}
/*========================================*/
    //OBTENER_DATOS_INPUTS
/*========================================*/
const obtenerdatos = () =>{
    return new Promise((res, err)=>{
        email=document.getElementById('emailA').value.toString();
        pass=document.getElementById('passwordA').value.toString();
        clave=document.getElementById('claveA').value.toString();
        //VERIFICAR ELEMENTOS VACIOS
        if (email === "" || pass === "" || clave === ""){  err("Error A1: " + "Porfavor llenar todos los campos.") }
        else{  res(true);  }
    });
}
/*========================================*/
    //CONSULTA_CLAVE
/*========================================*/
const consulataclave = (clave1) =>{
    Tiempo = false;
    return new Promise((res, err)=>{
        //clave = '2070682292046';
        db.collectionGroup('proyectosE').where('Clave', '==', clave1).limit(1).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                //Imprimir
                console.log(doc.id, ' => ', doc.data());
                datosclave = doc.data();
                claveid = doc.id;
                res(true);
                Tiempo = true;
            });
        }).catch(function(error){
            err("Error B1: " + error);
        });
        /*/////////////////////////////////////*/
    });
}
/*========================================*/
    //USUARIO EXISTENTE
/*========================================*/
const usuarioexistente = (email1, pass1) =>{
    return new Promise ((res, err)=>{
        //FIEBASE ACCEDER (Comprobar usuario y contraseña)
        firebase.auth().signInWithEmailAndPassword(email1, pass1).then(function(){
            
            //SI ESTA REGISTRADO
            res("REGISTRADO");

        }).catch(function(error) {
            //NO Ingreso
            var errorCode = error.code;
            var errorMessage = error.message;
            //El formato del correo es incorrecto.
            if (errorMessage === "The email address is badly formatted."){
                err("La dirección de correo electrónico está mal.");
            }
            //Contraseña o correo mal escrita.
            if (errorMessage === "The password is invalid or the user does not have a password."){
                err("El usuario, Clave o Contraseña es incorecta.");
            }
            //NO ESTA REGISTRADO
            if (errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted."){
                //CREAR USUARIO
                res("NUEVOUSUARIO");
            }
        });
        /*/////////////////////////////////////*/
    });
}
/*========================================*/
    //CREAR USUARIO 
/*========================================*/
const crearusuario = (email3, pass3)=>{
    return new Promise((res, err)=>{
        //Firebase SUBIR DATOS
        firebase.auth().createUserWithEmailAndPassword(email3, pass3)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message; 	
            err("Codigo: " + errorCode + "  Mensaje:" + errorMessage);
        }).then(function(){
            res(true);
        });
    });
}
/*========================================*/
    //TIPO USUARIO
/*========================================*/
const tipodeusuario = () =>{
    return new Promise((res, err)=>{
        try{
            //VER SI ES MASTER O VISITA
            masters = datosclave.Masters;
            mastersmax = datosclave.MastersMax;
            console.log("# " + masters +"<" + mastersmax);
            if (masters < mastersmax){
                //CREAR USUARIO MASTER
                res("MASTER");
            }else{
                //CREAR USUARIO VISITA
                res("INVITADO");
            }
        }catch(error){
            err(error);
        }
    });
 }
/*========================================*/
    //ACTUALIZAR NOMBRE INFORMACION A MASTER O INVITADO
/*========================================*/
const actualizarinfo1 = (clave3, tipo3) =>{
    return new Promise((res, err)=>{
        //Concatenar info
        var datosusuario = clave3 + "/" +  tipo3 ;
            //Actualizar datos
            var user1 = firebase.auth().currentUser;
            user1.updateProfile({
            displayName: datosusuario
            }).then(function() {
            res(true);
            }).catch(function(error) {   res(false); err(error); console.log(error);    });
    });
}
/*========================================*/
    //ACTUALIZAR MASTER + 1
/*========================================*/
const aumentarmaster1 = (masters, claveid3)=>{
    return new Promise((res,err)=>{
        numMasters = masters + 1;
        
        db.collection("proyectosE").doc(claveid3).update({
            Masters: numMasters
        }).then(function() {
            res(true);
        }).catch(function(error){
            err(error);
            res(false);
            console.log(error);
            alert(error);
        });

    });
}
/*========================================*/
    //COMPROBAR CONTRASEÑA
/*========================================*/
const proyectodatos1 = (clave4) => {
    return new Promise((res, err)=>{

        var ref1 =  db.collectionGroup('proyectos').where('ClaveM', '==',clave4);
            ref1.limit(1).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //Imprimir
                    console.log(doc.id, ' => ', doc.data());
                    res(doc.data());
                });
            }).catch(function(error){
                err("ERROR2 " + error);
                console.log("Error " + error);
            });

    });
}
/*========================================*/
//Redireccionar
/*========================================*/
function redireccionarverificar(){
    //=========================
        window.location = "0_verficar.html";
    //=========================
}
/*========================================*/
//Redireccionar 2
/*========================================*/
function redireccionardetalles(){
    //=========================
        window.location = "1_proyecto_detalles.html";
    //=========================
}
/*========================================*/
//Redireccionar 3
/*========================================*/
function redireccionaractulizardatos(){
    //=========================
        window.location = "5_1_actualizar_datos.html";
    //=========================
}










