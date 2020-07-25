/*========================================*/
    //{A}-Variables Globales
/*========================================*/
Idtxt = null;
/*========================================*/
    //{A}-OBTENER-URL
/*========================================*/
// capturamos la url
function getid(){
    var loc = document.location.href;
    // si existe el interrogante
    if(loc.indexOf('?')>0)
    {
        //Parte de la url que hay despues del interrogante
        Idtxt = loc.split('?')[1];
    }else{ msgerror("No se encuentra el id del proyecto.");  }
    
    return Idtxt
}
/*========================================*/
    //{A}-INICIAR 
/*========================================*/
console.log(getid());

/*//////////////////////////////////////////////////////////////////////////////*/
/*///////            ACTUALIZAR FOTO             ///////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////////////*/
const actualizarfoto = (id)  =>{
    window.location = "8_4_actualizarproyectofotos.html"+"?"+id;
}



/*//////////////////////////////////////////////////////////////////////////////*/
/*///////        ACTUALIZAR ESTADO CUENTA         //////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////////////*/
const actulizarestadof = (id) =>{
    window.location = "8_4_actualizarproyectofotos.html"+"?"+id;
}


/*//////////////////////////////////////////////////////////////////////////////*/
/*///////              ERROR  MENSAJE             //////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////////////*/
const msgerror = (text) =>{
    //actulizar texto
    txtareaerror = document.getElementById('areaerror').innerHTML= text;
    //Mostrar
    $('#errorModal').modal('show');
}

