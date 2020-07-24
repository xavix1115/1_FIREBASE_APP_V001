
var gulp = require('gulp');
var del = require('del');

//RUTAS
const carpetaorigen ="carpeta1/";
const carpetadestino = "carpeta2/";



const origen = carpetaorigen + "**/*";
const destino = carpetadestino;
const borrar = carpetadestino + "**";




//COPIA TODOS  LOS ARCHIVOS
gulp.task('copy', function () {
    return gulp.src(origen).pipe(gulp.dest(destino));
});

// ELIMINA TODOS LOS ARCHIVOS
gulp.task('clean', function() {
    return del([borrar, '!public']);
  });

gulp.task('observar', () =>{
    gulp.watch('carpeta1/**/*', gulp.series('clean','copy'));
    console.log('observando');
});



gulp.task('default', function () {
    console.log('Default inicializada');
});