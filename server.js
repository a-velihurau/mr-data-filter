const express = require('express');
const https = require('https');
const path = require('path');

const PORT = process.env.PORT || 3080;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/data.json', async (request, response) => {
  const promise = new Promise ((resolve, reject) => {
    const receivingData = https.get('https://www.mrsoft.by/data.json', (req) => {
      let body = [];

      req.on('data', (chunk) => {
        body.push(chunk);
      })
        .on('end', () => {
          body = Buffer.concat(body).toString();

          resolve(body);
        });
    });

    receivingData.on('error', err => {
      reject(err);
    });
  });

  const dataFromPromise = await promise;

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Headers", "content-type");
  response.setHeader("Access-Control-Max-Age", "1800");
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  response.end(dataFromPromise);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} port...`)
});
