"use strict";

const TEST_MODEL = require("../models/dataTransaferLogs");
//const AXIOS = require("axios");
//const APM = require("apm_tool");

var orderServices = {

    getData: async function (filter, select, sort, skip, limit) {
        let data = [];

        try {

            data = await TEST_MODEL.find(filter).read('secondaryPreferred').select(select).sort(sort).skip(skip).limit(limit).lean();
            //apm.log(e);
            
        } catch (e) {

            //apm.error(e);
            console.error(error);
        }

        return data;
    },

    getSingleDocument: async function (filter, select) {

        let data = null;

        try {

            data = await TEST_MODEL.findOne(filter).read('secondaryPreferred').select(select).lean();

        } catch (e) {

            console.error(e.message);
        }

        return data;
    },

    getAggregationData: async function (aggPipeline) {

        let data = [];

        try {

            data = await TEST_MODEL.aggregate(aggPipeline).read('secondaryPreferred');

        } catch (e) {

            console.error(e.message);
        }

        return data;
    },

    updateData: async (findFilter, updateData) => {

        let data = [];

        try {

            data = await TEST_MODEL.findOneAndUpdate(findFilter, updateData, { new: true }).lean();

        } catch (e) {

            console.error(e.message);
        }

        return data;
    },

    updateMulti: async (findFilter, updateData) => {

        let data = [];

        try {

            data = await TEST_MODEL.updateMany(findFilter, updateData, { "multi": true }).lean();

        } catch (e) {

            console.error(e.message);
        }

        return data;
    },

    addData: async (data) => {

        let newDoc = null;

        try {

            let dataObj = new TEST_MODEL(data);
            let newDoc = await dataObj.save();
            return newDoc;

        } catch (e) {

            console.error(e.message);
        }

        return newDoc;
    }

};

module.exports = orderServices;
