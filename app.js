const http = require('http');

const express = require('express');

const app = express();

const server = http.createServer(app);

const PORT = 3000;

console.log(`Listening on port ${PORT}...`);
server.listen(3000);