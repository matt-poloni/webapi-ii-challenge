const express = require('express');
const cors = require('cors');

const postsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());
server.use(cors())

server.get('/', (req, res) => {
  res.send("It's working");
});

server.use('/api/posts', postsRouter);

module.exports = server;