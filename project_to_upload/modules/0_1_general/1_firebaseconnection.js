"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var admin = require('firebase-admin');
var serviceAccount = require("./alfadb01-firebase-adminsdk-chmze-2a68cb5f9b.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
exports.db = db;
module.exports = db;
