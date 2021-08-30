const express = require('express')
const app = express()
// const port = 3000;
const port = process.env.PORT;
const http = require('http');
const fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser');
let favicon = require('serve-favicon');
var path = require('path')

app.use(favicon(path.join(__dirname, 'pub/img', 'favicon.ico')));

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(
    "User-agent: *\nAllow:\n"
  );
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pub/html/app.html')
});

app.get('/job', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/index.html')
});

app.get('/job/designer', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/designer.html')
});
app.get('/job/teacher', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/teacher.html')
});
app.get('/job/author', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/author.html')
});
app.get('/job/psychologist', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/psychologist.html')
});

app.get('/job/architect', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/architect.html')
});
app.get('/job/broker', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/broker.html')
});
app.get('/job/programmer', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/programmer.html')
});
app.get('/job/expert', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/expert.html')
});

app.get('/job/agent', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/agent.html')
});
app.get('/job/promotion', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/promotion.html')
});
app.get('/job/official', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/official.html')
});
app.get('/job/therapist', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/therapist.html')
});

app.get('/job/police', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/police.html')
});
app.get('/job/comedian', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/comedian.html')
});
app.get('/job/pilot', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/pilot.html')
});
app.get('/job/cook', (req, res) => {
  res.sendFile(__dirname + '/pub/html/job/cook.html')
});


app.get('/mg', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/index.html')
});
app.get('/mg/big', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/big.html')
});
app.get('/mg/dam', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/dam.html')
});
app.get('/mg/san', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/san.html')
});
app.get('/mg/gong', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/gong.html')
});
app.get('/mg/ku', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/ku.html')
});
app.get('/mg/ni', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/ni.html')
});
app.get('/mg/gao', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/gao.html')
});
app.get('/mg/pie', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/pie.html')
});
app.get('/mg/non', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/non.html')
});
app.get('/mg/ru', (req, res) => {
  res.sendFile(__dirname + '/pub/html/mg/ru.html')
});


app.get('/ai', (req, res) => {
  res.sendFile(__dirname + '/pub/html/ai/index.html')
});
app.get('/ai2', (req, res) => {
  res.sendFile(__dirname + '/pub/html/ai/index2.html')
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static('pub'));