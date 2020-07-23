const admin = require('firebase-admin');
var serviceAccount = require("./alfadb01-firebase-adminsdk-chmze-2a68cb5f9b.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();
//Exportar
module.exports = db;