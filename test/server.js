const http = require('http');
const express = require('express')
const { config } = require('../index');
const Upload = require('./upload');

const app = express();
app.use(express.json());
config(app);
Upload.config(app);

module.exports = app;
const server = http.createServer(app);
// server.listen(process.env.PORT || 3000);

module.exports = server;