/*=========================================================*/
  /* --- GENERADOR DE CONTRASEÑAS ---*/
  /*=========================================================*/
  
  

  
  
  function generarcontraseña(){

    var contraseñaM='';
    var contraseñaV='H5BZX6QR';
    
    var caracteres = '0 1 2 3 4 5 6 7 8 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'
    var largocontraseña = 8;
    
    /*Quitar escios al principio y final*/
      caracteres = caracteres.trim();
    /*Colocarlo en u array*/
    caracteres = caracteres.split(' ');

    //Generar contraseña
    for (var i = 0; i < largocontraseña; i++){
       contraseñaM += caracteres[Math.floor(Math.random() * caracteres.length)];
    }

    //Colocar texto
    document.getElementById('contraseñatext').innerHTML= '';
    document.getElementById('contraseñatextV').innerHTML= '';
    document.getElementById('contraseñatext').innerHTML= contraseñaM;
    document.getElementById('contraseñatextV').innerHTML= contraseñaV;

    
    
    /*********************************************/
    //GENERAR CLAVE
    /*********************************************/
    generarclave();
    /*********************************************/



  }


  /*=========================================================*/
  /* --- GENERADOR DE CLAVES ---*/
  /*=========================================================*/
  function generarclave(){

    var clave = '';
    var fecha = new Date();
    

    
    var año = fecha.getFullYear().toString();
    var mes = (fecha.getMonth() + 1).toString();
    var dia = fecha.getDate().toString();
    var minutos = fecha.getMinutes().toString();
    var segundos = fecha.getSeconds().toString();
    var a = año.substr(2,3);
    
    if (mes < 10){mes = "0" + mes;}
    if (dia < 10){ dia = "0" + dia;}
    if (minutos < 10){ minutos = "0" + minutos;}
    if (segundos < 10){ segundos = "0" + segundos;}

    clave = a + "7" + mes + "8" + dia + "9" + minutos + segundos;

    document.getElementById('clavetextV').innerHTML = '';
    document.getElementById('clavetext').innerHTML = '';
    document.getElementById('clavetext').innerHTML = clave;
    document.getElementById('clavetextV').innerHTML = clave;
    

    /*********************************************/
    /* SUBIR DATOS */
    /*********************************************/
    subirdatos();
    /*********************************************/

  }


  function textcreado(){
    document.getElementById('mensajetxt').innerHTML = '';
    
    document.getElementById('mensajetxt').innerHTML = '<div class="row m-0 m-b-40"><div class="col-lg-12 col-md-12">'+
    '<div class="alert alert-success font-16">Usuario Creado exitosamente'+
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
    '<i class="mdi mdi-close font-18"></i>'+
    '</button></div></div></div><div class="row m-t-40"></div>';

  }