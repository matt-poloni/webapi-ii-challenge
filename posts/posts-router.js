const express = require('express');

const db = require('../data/db.js');

const router = express.Router();

// GET all posts
router.get('/', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: 'The posts information could not be retrieved.' }))
})

// POST new post
router.post('/', (req, res) => {
  const newPost = req.body;
  !newPost.title || !newPost.contents
    ? res.status(400).json({ error: 'Please provide title and contents for the post.' })
    : db.insert(newPost)
      .then(id => res.status(201).json(newPost))
      .catch(err => res.status(500).json({ error: 'There was an error while saving the post to the database.' }))
})

// GET specific post
router.get('/:id', (req, res) => {
  const postID = req.params.id;
  db.findById(postID)
    .then(post => {
      !post.length
        ? res.status(404).json({ error: 'The psot with the specified ID does not exist.' })
        : res.status(200).json(post);
    })
    .catch(err => res.status(500).json({ error: 'The post information could not be retrieved' }))
})

module.exports = router;