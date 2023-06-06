'use strict';

var mongoose = require('mongoose');
try {
    var mongoConnect = require('../../common/mongodb');
} catch (e) {
    console.log(e);
    if (!mongoConnect) {
        console.log("Mongo connection error");
        process.exit(0);
    }
}

var dbCreds = {
    database: "testDB2",
    applicationId: "t001"
}

mongoose.set("strictQuery", false);
let connection = mongoConnect.getConnection(dbCreds, mongoose);
// let testSchema1 = mongoose.Schema({
//     userId: {
//         type: 'Number',
//         required: true
//     },
//     name: {
//         type: 'String',
//         required: true
//     },
//     name1: {
//         type: 'String',
//         required: true
//     }
// });

let testSchema = mongoose.Schema({},{strict:false});

module.exports = connection.model('testCollection', testSchema, 'testCollection');