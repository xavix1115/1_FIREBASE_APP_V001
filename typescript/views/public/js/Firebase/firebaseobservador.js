/*========================================*/
/*========================================*/
  // OBSERVADOR LOGIN Y EMAIL VERIFICADO
/*========================================*/

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
        
        console.log(user);
        console.log(emailVerified + " email verificado");
        if (emailVerified === false){
            //Corre no verificado enviar correo
            //correoverificar();
            
        }else{
            //usuario verificado
            
        }
        document.getElementById('login1').innerHTML="Logueado " + user.email;


    } else {
        document.getElementById('login1').innerHTML="NO logueado ";
    }

});


//CERRAR SECION
function cerrar(){
    firebase.auth().signOut().then(function(){
        //Cerrar secion
        alert("se cerro secion");
    }).catch(function(error){
        //error
        console.log(error);
    });
}



/*========================================*/
//Enviar correo de autenticacion
/*========================================*/


function correoverificar(){
    var user2 = firebase.auth().currentUser;

    user2.sendEmailVerification().then(function() {
        alert("corre enviado");
    }).catch(function(error) {
        alert(error);
    });
}





