
var gulp = require('gulp');
var del = require('del');

//RUTAS
const carpetaorigen ="typescript/views/views/";
const carpetadestino = "project_to_upload/views/views/";



const origen = carpetaorigen + "**/*";
const destino = carpetadestino;
const borrar = carpetadestino + "**";




//COPIA TODOS  LOS ARCHIVOS
gulp.task('copy', function () {
    return gulp.src(origen).pipe(gulp.dest(destino));
});

//ELIMINA TODOS LOS ARCHIVOS
gulp.task('clean', function() {
    return del([borrar, '!public']);
  });

//OBSERVA LOS CAMBIOS EN LA CARPETA ORIGIN
gulp.task('observar', () =>{
    gulp.watch(origen, gulp.series('clean','copy'));
    console.log('observando');
});


//FUNCION DEFAULT
gulp.task('default', function () {
    console.log('Default inicializada');
});