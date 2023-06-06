"use strict";

const TF_SERVICES = require("../services/transaferLogsServices");

var controllers = {

    addTransferLogs: async function (req, res) {

        let body=req.body;

        console.log(body)

        try {

            let ips = ["ip1", "ip2", "ip3", "ip4", "ip5", "ip6", "ip7", "ip8", "ip9", "ip10", "ip11", "ip12", "ip13", "ip14", "ip15", "ip16", "ip17", "ip18", "ip19", "ip20"];
            let sessions = ["session1", "session2", "session3", "session4", "session5", "session6", "session7", "session8", "session9", "session10", "session11", "session12", "session13", "session14", "session15", "session16", "session17", "session18", "session19", "session20"];
            let dataArray=[];
            for (let i = 0; i < 100; i++) {
                let currentTime = parseInt(Date.now());
                let cr = await getRandom(0, ips.length);
                let ct = await getRandom(0, 2);
                let cIP = ips[cr];
                let sessionId = sessions[cr];
                let rIP="ip"+await getRandom(101,999);
                let packetSize=await getRandom(10,65535);

                //console.log(ct)

                let sourceIp = cIP;
                let destinationIp = rIP;

                if (ct == 1) {
                    sourceIp=rIP;
                    destinationIp=cIP;
                }

                let data = {
                    sessionId: sessionId,
                    timeStamp: currentTime,
                    dateTime: new Date(),
                    protocol: "TCP",
                    sourceIp: sourceIp,
                    destinationIp: destinationIp,
                    packetSize:packetSize
                }


                await TF_SERVICES.addData(data);
            }

            //return res.send("Done");

        } catch (e) {
            console.log(e);
        }

        return res.send(body);

    },

    getTransferLogs: async function (req, res) {

        let body=req.body;

        let data=[];

        try {

            let filter={
                "sourceIp":"ip2"
            };

            let select={
                _id:0
            }

            let sort={
                destinationIp:-1
            }

            data=await TF_SERVICES.getData(filter,select,sort,0,10);
         

        } catch (e) {
            console.log(e);
        }

        return res.send(data);

    },

    updateTransferLogs: async function (req, res) {

        let body=req.body;

        let data=null;

        try {

            let filter={
                "sourceIp":"ip2"
            };

            let updateData={
                "$set":{
                    destinationIp:"testip"
                }
            }

            data=await TF_SERVICES.updateMulti(filter,updateData)
         

        } catch (e) {
            console.log(e);
        }

        return res.send(data);

    }
};

async function getRandom(min, max) {
    let randomNo = null;
    try {

        randomNo = Math.floor(Math.random() * (max - min) + min);

    } catch (e) {
        console.log(e);
    }
    return randomNo;
}

module.exports = controllers;