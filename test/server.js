const http = require('http');
const express = require('express')
const { config, uploadImage, makeThumb, viewImage, sendResult } = require('../index');
const Upload = require('./upload');

const app = express();
app.use(express.json());
config(app);
Upload.config(app);

const fooPath = __dirname + '/uploads/foo';

app.post('/upload/foo', 
  uploadImage({path: fooPath}),
  makeThumb({subDir: 'thumbnails', size: { w: 160, h: 160}}),
  sendResult);

app.get('/img/foo/:fileName', viewImage({path: fooPath}));
app.get('/img/foo/th/:fileName', viewImage({path: fooPath + '/thumbnails'}));

module.exports = app;
const server = http.createServer(app);
// server.listen(process.env.PORT || 3000);

module.exports = server;