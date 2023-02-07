const express = require('express');
const app = express();
const port = 3000;

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
    count+= valorA-valorB;
    res.send({'value': count})
})

app.get('/value', (req, res) => {
    res.send({'value': count})
})

app.listen(port, () => {
  console.log(`Final app listening on port ${port}`)
})