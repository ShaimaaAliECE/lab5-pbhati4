const express = require('express');

const app = express();
const jobList = require("./jobs.json");

app.use(express.static('static'));

app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.sendFile('/frontend/index.html', { root: __dirname })
})
  
app.listen(80);