const Redis = require('redis')

const redisClient = Redis.createClient({
    legacyMode: true
});

const DEFAULT_EXPIRATION = 3600;

async function dataFromRedis(key, callBack) {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    return new Promise((res, rej) => {
        redisClient.get(key, (err, data) => {
            if (err) {
                return rej('Error Happened')
            }
            if (data) {
                return res(JSON.parse(data))
            }
            try {
                callBack(data => {
                    redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(data))
                    res(data)
                })
            } catch (e) {
                rej(e)
            }

        })
    })
}

module.exports = {
    dataFromRedis
}