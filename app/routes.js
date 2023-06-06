'use strict';

const CONTOLLER = require('./controllers/controller');

module.exports = function(app) {
    // app.route('/coutloot/suppliers/testData').post(CONTOLLER.getDashboardHome);
    // app.route('/coutloot/suppliers/testScr').post(CONTOLLER.testScriptAdd);
    // app.route('/coutloot/suppliers/testScrG').post(CONTOLLER.testScriptGet);
    app.route('/addTransferLog').post(CONTOLLER.addTransferLogs);
    app.route('/getTransferLog').post(CONTOLLER.getTransferLogs);
    app.route('/updateTransferLog').post(CONTOLLER.updateTransferLogs);

};