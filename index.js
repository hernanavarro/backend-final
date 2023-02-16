const express = require('express');
const dotenv = require('dotenv');
const redis = require('redis');
const app = express();
const port = 3000;
//const { add, sub, reset } = require("./services/operators");
const add = require("./services/add");

dotenv.config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

// redis init
(async () => {
    await redisClient.connect();
})();

console.log("Connecting to the Redis");

redisClient.on("ready", () => {
    console.log("Connected!");
});

redisClient.on("error", (err) => {
    console.log("Error in the Connection");
});
// redis end

app.use(express.json());

let count = 0;

function reset () {
    count = 0;
    return count;
};

function sub (count, valor) {
    return parseFloat(count)-parseFloat(valor);
};

app.get('/add/:a', async (req, res) => {
    let count = await redisClient.get("count");
    if (count === null) {
        await redisClient.set("count", 0);
        res.send({ value: 0 });
        return;
      }
    const valorA = parseFloat(req.params.a);
    count = parseFloat(count);
    count = add(count, valorA);
    console.log(count);
    await redisClient.set("count", count);
    res.send({ value: count });
});

app.get('/subtract/:a', async (req, res) => {
    let count = await redisClient.get("count");
    if (count === null) {
        await redisClient.set("count", 0);
        res.send({ value: 0 });
        return;
      }
    const valorA = parseFloat(req.params.a);
    count = parseFloat(count);
    count = sub(count, valorA);
    console.log(count);
    await redisClient.set("count", count);
    res.send({ value: count });
});

app.get('/subtract/:a/:b', (req, res) => {
    const valorA = parseFloat(req.params.a);
    const valorB = parseFloat(req.params.b);
    count = count - valorA - valorB;
    res.send({ 'value': count });
});

app.get("/value", async (req, res) => {
    let count = await redisClient.get("count");
    if (count === null) {
        await redisClient.set("count", 0);
        res.send({ value: 0 });
        return;
    }
    console.log(count);
    res.send({ value: count });
});

app.get("/reset", async (req, res) => {
    let count = await redisClient.get("count");
    if (count === null) {
        await redisClient.set("count", 0);
        res.send({ value: 0 });
        return;
    }
    console.log(count);
    count = reset();
    await redisClient.set("count", count);
    res.send({ value: count });
});

app.listen(port, () => {
    console.log(`Final app listening on port ${port}`);
});
