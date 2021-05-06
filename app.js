const express = require('express')
const app = express()
const port = 3000
const http = require('http');
const fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pub/html/app.html')
});

app.get('/job', (req, res) => {
  res.sendFile(__dirname + '/pub/html/index.html')
});

app.get('/job/e,n,f,p', (req, res) => {
  res.sendFile(__dirname + '/pub/html/jobenfp.html')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static('pub'));