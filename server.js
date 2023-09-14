const http = require('http');
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

const port = 8000; //인스턴스 생성시 만들었던 포트번호 기입

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', async (req, res) => {
  let crolling = await axios.get('https://www.naver.com');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write(crolling);
  res.sendFile(crolling);
  // console.log(crolling);
  // res.send(crolling);
  // res.set({
  //   'Cache-Control': 'no-cache, no-store, must-revalidate',
  //   Pragma: 'no-cache',
  //   Date: Date.now(),
  // });
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

http.createServer(app).listen(port, () => {
  console.log(`app listening at ${port}`);
});
