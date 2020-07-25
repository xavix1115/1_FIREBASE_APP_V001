/*========================================*/
    //{A}-Variables Globales
/*========================================*/
datostxt =[];
datostxtnuevo =[];
datos = null;
cambios = false;
Idtxt = null;
/*========================================*/
    //{A}-OBTENER-URL
/*========================================*/
async function setup(){
        // capturamos la url
        var loc = document.location.href;
        // si existe el interrogante
        if(loc.indexOf('?')>0)
        {
            // cogemos la parte de la url que hay despues del interrogante
            Idtxt = loc.split('?')[1];
            
            //buscar proyecto
            await db.collection("proyectos").doc(Idtxt).onSnapshot(function(doc) {
                datos = doc.data();  console.log(datos);
                //Colocar texto
                colocartxt(datos);
            });
            //TIEMPO MAXIMO CONSULTA
            setTimeout(function(){
                if(datos === undefined || datos === null){
                    msgerror("Error no se encuentra el proyecto");}
            },6000)
        }else{
            msgerror("No se encuentra el id del proyecto.");
        }
        
}
/*========================================*/
    //{A}-INICIAR SETUP
/*========================================*/
setup();
/*========================================*/
    //{B}-COLOCAR TEXTO
/*========================================*/
const colocartxt = (datos) =>{
    try{
        //Colocar texto
        datostxt[0] = document.getElementById('seccion').value = datos.Seccion;
        datostxt[1] = document.getElementById('idproyecto').value = datos.IDproyecto;
        datostxt[2] = document.getElementById('departamento').value = datos.Departamento;
        datostxt[3] = document.getElementById('municipio').value = datos.Municipio;
        datostxt[4] = document.getElementById('direccion').value = datos.Direccion;
        datostxt[5] = document.getElementById('representante').value = datos.Representante;
        datostxt[6] = document.getElementById('telefono').value = datos.Telefono;
        datostxt[7] = document.getElementById('correo2').value = datos.Correo;
        datostxt[8] = document.getElementById('comentario').value = datos.Comentario;
        datostxt[9] = document.getElementById('clavetext').innerHTML = datos.ClaveM;
        datostxt[10] = document.getElementById('contraseñatext').innerHTML = datos.ContraseñaM;
        datostxt[11] = document.getElementById('clavetextV').innerHTML = datos.ClaveV;
        datostxt[12] = document.getElementById('contraseñatextV').innerHTML = datos.ContraseñaV;
    }catch(error){
        msgerror(error);
    }
}
/*========================================*/
    //{C}-ACTUALIZAR-TEXTO
/*========================================*/
const actualizarinfo1 = ()=>{
    //Obtener datos
    datostxtnuevo[0] = document.getElementById('seccion').value;
    datostxtnuevo[1] = document.getElementById('idproyecto').value;
    datostxtnuevo[2] = document.getElementById('departamento').value;
    datostxtnuevo[3] = document.getElementById('municipio').value;
    datostxtnuevo[4] = document.getElementById('direccion').value;
    datostxtnuevo[5] = document.getElementById('representante').value;
    datostxtnuevo[6] = document.getElementById('telefono').value;
    datostxtnuevo[7] = document.getElementById('correo2').value;
    datostxtnuevo[8] = document.getElementById('comentario').value;
    //Valuar datos para ver si hay cambios
    for (let i=0; i < 9; i++){
        if (datostxt[i] !== datostxtnuevo[i]){
            cambios = true;
        }
    }
    //si hay cambios actualizar informacion
    if (cambios === true){
        //Mostrar
        $('#cambiosModal').modal('show');
    }else{
        msgerror("No hay cambios en el proyecto para poder actualizar.")
    }
}
/*========================================*/
    //{C}-ACTUALIZAR-INFORMACION
/*========================================*/
const actualizarfirebase = () =>{
    //actualizar
    db.collection("proyectos").doc(Idtxt).update({
        "Seccion": datostxtnuevo[0],
        "IDproyecto": datostxtnuevo[1],
        "Departamento": datostxtnuevo[2],
        "Municipio": datostxtnuevo[3],
        "Direccion": datostxtnuevo[4],
        "Representante": datostxtnuevo[5],
        "Telefono": datostxtnuevo[6],
        "Correo": datostxtnuevo[7],
        "Comentario": datostxtnuevo[8]
    }).then(function(){
        document.getElementById('tituloModal').innerHTML = "Actualizacion con exito";
        msgerror("Proyecto actualizado!");
    }).catch(function(error){
        msgerror("A " + error);
    });
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

function cerrarformerror(){
    $('#errorModal').modal('hide')
}

