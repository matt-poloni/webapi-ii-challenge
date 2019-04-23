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
      .then(async posted => {
        const post = await db.findById(posted.id);
        res.status(201).json(post[0]);
      })
      .catch(err => res.status(500).json({ error: 'There was an error while saving the post to the database.' }))
})

// GET specific post
router.get('/:id', (req, res) => {
  const postID = req.params.id;
  db.findById(postID)
    .then(post => {
      !post.length
        ? res.status(404).json({ error: 'The post with the specified ID does not exist.' })
        : res.status(200).json(post[0]);
    })
    .catch(err => res.status(500).json({ error: 'The post information could not be retrieved' }))
})

// DELETE specific post
router.delete('/:id', async (req, res) => {
  const postID = req.params.id;
  const deleted = await db.findById(postID);
  db.remove(postID)
    .then(count => {
      console.log('then', count) // returns `then 1`
      !count
        ? res.status(404).json({ error: 'The post with the specified ID does not exist.' })
        : res.status(200).json(deleted[0]);
    })
    .catch(err => {
      console.log('catch', err) // returns `catch TypeError: Converting circular structure to JSON`
      res.status(500).json({ error: 'The post could not be removed.' })
    });
})

// PUT (update) specific post
router.put('/:id', (req, res) => {
  const newPost = req.body;
  const postID = req.params.id;
  !newPost.title || !newPost.contents
    ? res.status(400).json({ error: 'Please provide title and contents for the post.' })
    : db.update(postID, newPost)
        .then(async count => {
          const updated = await db.findById(postID);
          !count
            ? res.status(404).json({ error: 'The post with the specified ID does not exist.' })
            : res.status(200).json(updated[0]);
        })
        .catch(err => res.status(500).json({ error: 'The post information could not be modified.' }))
})

module.exports = router;