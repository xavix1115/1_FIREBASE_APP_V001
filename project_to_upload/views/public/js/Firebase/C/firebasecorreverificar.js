/*========================================*/
/*========================================*/
  // OBSERVADOR LOGIN Y EMAIL VERIFICADO
/*========================================*/
datosusuario = "";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.

        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        datosusuario = user;
        
        console.log(user);
        console.log(emailVerified + " email verificado");
        if (emailVerified === false){
            //Corre no verificado enviar correo
            //enviar correo
            correoverificar();
        }else{
            //usuario verificado
            redireccionaractulizardatos();
        }
        document.getElementById('login1').innerHTML="Logueado " + user.email;


    } else {
        document.getElementById('login1').innerHTML="NO logueado ";
    }

});




/*========================================*/
//Enviar correo de autenticacion
/*========================================*/
function correoverificar(){
    var user2 = firebase.auth().currentUser;

    user2.sendEmailVerification().then(function() {
        alert("corre enviado");
    }).catch(function(error) {
        errormensaje="Error";
        if (error === "Missing recipients" || error === "Error: Missing recipients"){
            errormensaje ="El correo utilizado ( " + datosusuario.email + " ) no es correcto";
        }
        if (error === "Error: We have blocked all requests from this device due to unusual activity. Try again later."){
            errormensaje = "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Intenta nuevamente más tarde.";
        }
        alert(errormensaje);
        alert(error);
    });
}
/*========================================*/
//Redireccionar 3
/*========================================*/
function redireccionaractulizardatos(){
    //=========================
        window.location = "5_1_actualizar_datos.html";
    //=========================
}




