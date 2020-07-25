/*========================================*/
    //OBTENER TABLA
/*========================================*/
tabla = document.getElementById('editable-datatable');
contador = 0;

/*========================================*/
    //{A}-LEER BASE DE DATOS
/*========================================*/
const leerdatos= async () =>{
    await db.collection("proyectos").orderBy("FechaCreacion", "desc").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
            //IMPRIMIR DATO
            agregar(doc.id, doc);
        });
    }).catch((error) =>{
        console.log(error);
    });
    //Actualiza tabla y ordenar de forma desendente
    $('#editable-datatable').DataTable().order([0, 'desc']).draw();
    
    
}
/*//////////////////////////////////////////////////////////////////////////////*/
/*///////             AÑADIR                      //////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////////////*/


/*========================================*/
    //{B}-AÑADIR DATO
/*========================================*/
  const agregar = (id, doc) =>{
    contador += 1;
    if (contador === 1){ añadirtabla(id, doc); }else{ agregardato(id, doc); }
  }
/*========================================*/
    //{B}-AÑADIR PRIMER DATO CREANDO TABLA
/*========================================*/
const añadirtabla = (id, doc) =>{
    tabla.innerHTML = '';
    tabla.innerHTML += `<thead>
    <tr class="table-header">
      <th style="display: none;">Fecha Creacion</td>  
      <th>ID Proyecto</th>
      <th>Departamento</th>
      <th>Represetante</th>
      <td><a href="" class="dropdown-toggle no-after" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><i class="fas fa-ellipsis-v text-default op-5"></i></a>
        <div class="dropdown-menu"> <a class="dropdown-item" href="#">Edit</a> <a class="dropdown-item" href="#">Send Message</a> <a class="dropdown-item" href="#">Delete</a> </div></td>
    </tr>
  </thead>
  <tbody id="tabla">
  <tr>
    <td style="display: none;">${doc.data().FechaCreacion}</td>
    <td class="text-dark weight-600" onclick="actualizarproyecto()">${doc.data().IDproyecto}</td>
    <td onclick="actualizarproyecto()">${doc.data().Representante}</td>
    <td onclick="actualizarproyecto()">${doc.data().Departamento}</td>
    <td><a href="" class="dropdown-toggle no-after" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><i class="fas fa-ellipsis-v text-default op-5"></i></a>
      <div class="dropdown-menu"><a class="dropdown-item"  onclick="actualizarproyecto('${id}')" >Actulizar Estado</a> <a class="dropdown-item" onclick="editardatos('${id}')">Editar</a> <a class="dropdown-item"  onclick="formborrar('${id}','${doc.data().IDproyecto}')" data-toggle="modal" data-target="#exampleModal" >Borrar</a> </div></td>
  </tr>
  </tbody>`;
  //TABLA CUERPO
  tablacuerpo = document.getElementById('tabla');
  }
/*========================================*/
    //{B}-AÑADIR DATOS
/*========================================*/
const agregardato = (id, doc) =>{
    tablacuerpo.innerHTML += `<tr>
    <td style="display: none;">${doc.data().FechaCreacion}</td>
    <td onclick="actualizarproyecto()" class="text-dark weight-600">${doc.data().IDproyecto}</td>
    <td onclick="actualizarproyecto()">${doc.data().Representante}</td>
    <td onclick="actualizarproyecto()">${doc.data().Departamento}</td>
    <td><a href="" class="dropdown-toggle no-after" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><i class="fas fa-ellipsis-v text-default op-5"></i></a>
      <div class="dropdown-menu"><a class="dropdown-item"  onclick="actualizarproyecto('${id}')" >Actulizar Estado</a> <a class="dropdown-item" onclick="editardatos('${id}')">Editar</a> <a class="dropdown-item"  onclick="formborrar('${id}','${doc.data().IDproyecto}')" data-toggle="modal" data-target="#exampleModal" >Borrar</a> </div></td>
  </tr>`;
  }  

/*//////////////////////////////////////////////////////////////////////////////*/
/*///////             BORRAR                      //////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////////////*/
/*========================================*/
    //{C}-CAMBIA EL DATOS DEL FORM
/*========================================*/
const formborrar = (id, titulo) =>{
    //Obtener datos
    tituloproyecto = document.getElementById('txtborrartitulo');
    tituloproyecto2 = document.getElementById('txtborrartitulo2');
    idproyecto = document.getElementById('txtiddoc').value;
    
    //insertar titulo
    tituloproyecto.innerHTML = '"'+ titulo +'"';
    tituloproyecto2.innerHTML = '"'+ titulo +'"';
    //insertar id
    document.getElementById('txtiddoc').value = id.toString();
}
/*========================================*/
    //{C}-VALIDAR FORM BORRAR 1
/*========================================*/
const validarform1 = ()=>{
    textbox = document.getElementById('textbox').value;
    if (textbox === "BORRAR" || textbox === "borrar"){
        //cierra el form actual
        $('#exampleModal').modal('hide');
        //abre el siguiente form
        $('#exampleModal2').modal('show');
    }else{
        mensaje = "Debe escribir BORRAR para poder eliminar el proyecto."
        msgerror(mensaje);
    }
}
/*========================================*/
    //{C}-VALIDAR FORM BORRAR 2
/*========================================*/
const validarform2 = () =>{
    txtcomentrio = document.getElementById('txtcomentario').value;
    if (txtcomentrio === "" || txtcomentrio === " " ){
        msgerror("Porfavor ingresa un comentario para borrar el proyecto");
    }else{
        //obtener id
        idproyecto = document.getElementById('txtiddoc').value;
        if (idproyecto === "" || idproyecto === undefined ){msgerror("EL ID no se encuentra");}else{
            //borrar proyecto 
            borrarproyecto(idproyecto);
            //cierra el form actual
            $('#exampleModal2').modal('hide');
        }
    }
}
/*========================================*/
    //{C}-BUSCAR PROYECTO PARA BORRAR
/*========================================*/
const buscarproyectose = (id) =>{
    return new Promise((res, err)=>{
        db.collection("proyectos").doc(id).onSnapshot(function(doc) {
            //console.log("Current data: ", doc.data());
            iddocproyectose = doc.data().IDRef;
            res(iddocproyectose) ;
        });
    })
}
/*========================================*/
    //{C}-BORRAR DATO
/*========================================*/
const borrardato = (tabla,id) =>{
    return new Promise((resuelto,err)=>{
        db.collection(tabla).doc(id).delete().then(res =>{
            resuelto(true);
        }).catch(error =>{
            err(error);
        });
    });
}
/*========================================*/
    //{C}-BORRAR PROYECTO
/*========================================*/
const borrarproyecto = async (id) =>{
    //BUSCA EL PROYECTO REF
    const idref = await buscarproyectose(id);
    console.log(idref);
    
    borrado = true;
    //Borrar Proyecto datos
    borrardato('proyectos', id).catch(error =>{
        msgerror(error);
        borrado = false;
    });
    //Borrar proyectoE idref
    borrardato('proyectosE', idref).catch(error =>{
        msgerror(error);
        borrado = false;
    });
    //si se borro ejecutar
    if (borrado === true){
        //MUESTRA POP UP
        $('#exampleModal4').modal('show');
        leerdatos();
    }else{msgerror("no se puedo borrar el proyecto");}
}



/*//////////////////////////////////////////////////////////////////////////////*/
/*///////             EDITAR                      //////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////////////*/



/*========================================*/
    //{D}-EDITAR DATOS
/*========================================*/
const editardatos = (id) =>{
    window.location = "8_2_editarproyecto.html"+"?"+id;
}






/*//////////////////////////////////////////////////////////////////////////////*/
/*///////             ACTUALIZAR ESTADO           //////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////////////*/


/*========================================*/
    //{F}-EDITAR DATOS
/*========================================*/
const  actualizarproyecto = (id) =>{
    window.location = "8_3_actualizarproyectomenu.html"+"?"+id;
}


 
  


/*//////////////////////////////////////////////////////////////////////////////*/
/*///////             MENSAJE ERROR               //////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////////////*/
const msgerror = (text) =>{
    //actulizar texto
    txtareaerror = document.getElementById('areaerror').innerHTML= text;
    //Mostrar
    $('#exampleModal3').modal('show');
}

function cerrarformerror(){
    alert("hola");
    $('#exampleModal3').modal('hide')
}


  
  
/*===================================================================*/  
/*========================================*/
    //{0}-AL INICIAR EL DOCUMENTO
/*========================================*/
//Lee la base de datos
leerdatos();
  
  
  