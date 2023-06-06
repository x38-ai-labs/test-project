'use strict';

var MONGO_CREDS=null;

try {
    MONGO_CREDS = require('/etc/x38/credentials/mongoDB.json');

} catch (e) {
    console.log(e);
}

var mongoConnections = {

    getConnection: function (dbCreds, mongoose) {

        try {

            //let dbUrl = getDatabaseConnectionString(dbCreds.database);
            let dbUrl="mongodb://mahendra:test12345@localhost:27017/"+dbCreds.database+"?authSource=admin";
            let connection = mongoose.createConnection(dbUrl);
            console.log("Connected to " + dbCreds.database);
            return connection;

        } catch (e) {

            console.log("Error Connecting Database " + dbCreds.database);
            console.log(e);
            process.exit(0);
        }
    }
};

function getDatabaseConnectionString(databaseName) {

    let connectionString = null;

    try {


        if (MONGO_CREDS && MONGO_CREDS[databaseName]) {


            let dbArray = MONGO_CREDS[databaseName];

            if (dbArray.length == 1) {

                //POSSIBLEY BOTH

                let serverType = dbArray[0].serverType;
                let replicaSetName = dbArray[0].replicaSetName;
                let mongoUserName = dbArray[0].mongoUser;
                let mongoPassword = dbArray[0].mongoPassword;
                let mongoHost = dbArray[0].mongoHost;
                let mongoDatabase = dbArray[0].mongoDatabase;
                let mongoAuthDatabase = dbArray[0].mongoAuthDatabase;

                if (mongoUserName == undefined || mongoUserName == null || mongoUserName == "" || !mongoUserName) {
                    throw new Error("mongoUserName not found");
                }

                if (mongoPassword == undefined || mongoPassword == null || mongoPassword == "" || !mongoPassword) {
                    throw new Error("mongoPassword not found");
                }

                if (serverType == "CLUSTER") {

                    if (replicaSetName == undefined || replicaSetName == null || replicaSetName == "" || !replicaSetName) {
                        throw new Error("replicaSetName not found");
                    }
                    connectionString = `mongodb://${mongoUserName}:${mongoPassword}@${mongoHost}/${mongoDatabase}?authSource=${mongoAuthDatabase}&replicaSet=${replicaSetName}`;


                } else if (serverType == "STANDALONE") {

                    connectionString = `mongodb://${mongoUserName}:${mongoPassword}@${mongoHost}/${mongoDatabase}?authSource=${mongoAuthDatabase}`;

                } else {
                    connectionString = `mongodb://${mongoUserName}:${mongoPassword}@${mongoHost}/${mongoDatabase}?authSource=${mongoAuthDatabase}`;
                }

            } else if (dbArray.length > 1) {
                //REPLICA ONLY

                let serverType = dbArray[0].serverType;
                let replicaSetName = dbArray[0].replicaSetName;
                let mongoUserName = dbArray[0].mongoUser;
                let mongoPassword = dbArray[0].mongoPassword;
                let mongoHost = getMongodbHostList(dbArray);
                let mongoDatabase = dbArray[0].mongoDatabase;
                let mongoAuthDatabase = dbArray[0].mongoAuthDatabase;

                if (replicaSetName == undefined || replicaSetName == null || replicaSetName == "" || !replicaSetName) {
                    throw new Error("replicaSetName not found");
                }

                if (mongoUserName == undefined || mongoUserName == null || mongoUserName == "" || !mongoUserName) {
                    throw new Error("mongoUserName not found");
                }

                if (mongoPassword == undefined || mongoPassword == null || mongoPassword == "" || !mongoPassword) {
                    throw new Error("mongoPassword not found");
                }

                connectionString = `mongodb://${mongoUserName}:${mongoPassword}@${mongoHost}/${mongoDatabase}?authSource=${mongoAuthDatabase}&replicaSet=${replicaSetName}`;

            } else {
                throw new Error("No Connection Found");
            }

        } else {


            let variableName = "DB_ENV_" + databaseName;
            let tempValue = process.env[variableName]

            if (tempValue && tempValue.length > 10) {
                connectionString = tempValue;
            } else {
                throw new Error("No Connection Found");
            }

        }

    } catch (e) {
        console.log(e);
        connectionString = null;
    }

    return connectionString;
}

function getMongodbHostList(hostArray) {

    let hostString = "";

    try {


        for (let i = 0; i < hostArray.length; i++) {

            let host = hostArray[i];
            let hostUrl = host.mongoHost;

            if (hostString == "") {

                if (hostUrl && hostUrl.length > 3) {
                    hostString = hostUrl;
                } else {
                    throw new Error("Host url error");
                }

            } else {
                if (hostUrl && hostUrl.length > 3) {
                    hostString = hostString + "," + hostUrl;
                } else {
                    throw new Error("Host url error");
                }
            }

        }

    } catch (e) {
        console.log(e);
        hostString = "";
    }

    return hostString;
}

module.exports = mongoConnections;