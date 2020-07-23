//°°°°°°°°°° MODULES REQUIERE °°°°°°°°°°//
const app = require('./app');


//°°°°°°°°°° INICIAR SERVIDOR °°°°°°°°°°//
app.listen(app.get('port'));
console.log('Servidor escuchando en el puerto ',app.get('port'));