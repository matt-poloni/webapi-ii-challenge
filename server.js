const express = require('express');

// const someRouter = require('./something/some-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send("It's working");
});

// server.use('/api/something', someRouter);

module.exports = server;