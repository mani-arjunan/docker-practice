const { Trains } = require("../../../DataBase/CollectionDetail");
const dbOperations = require("../../../DataBase/mongoose");
const { dataFromRedis } = require('../../../helpers/rediscache')

const getAllTrainService = (callback) => {
    dbOperations(Trains, async (trainData) => {
        try {
            const data = await dataFromRedis('trains', (dataCallback) => {
                trainData.find({}).toArray((error, resultData) => {
                    if (error) {
                        dataCallback(new Error(error))
                    }
                    dataCallback(resultData)
                })
            })
            if (data.length === 0) {
                callback(null, { message: "No Trains" }, 200);
            } else {
                callback(null, data, 200);
            }
        } catch (e) {
            callback(e, null, 500)
        }
    });
};

module.exports = getAllTrainService;