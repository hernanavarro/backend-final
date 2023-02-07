const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;
const redisClient = redis.createClient(6379);

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

app.get('/add/:a/:b', (req, res) => {
    const valorA = parseFloat(req.params.a);
    const valorB = parseFloat(req.params.b);
    count+= valorA+valorB;
    res.send({'value': count})
})

app.get('/subtract/:a/:b', (req, res) => {
    const valorA = parseFloat(req.params.a);
    const valorB = parseFloat(req.params.b);
    count = count-valorA-valorB;
    res.send({'value': count})
})

app.get('/value', (req, res) => {
    res.send({'value': count})
})

app.listen(port, () => {
  console.log(`Final app listening on port ${port}`)
})