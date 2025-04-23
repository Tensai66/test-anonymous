const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      content: req.body.content
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific post with its comments
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    const comments = await Comment.findAll({
      where: { postId: req.params.id },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      post,
      comments
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upvote a post
router.put('/:id/upvote', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    post.upvotes += 1;
    await post.save();
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Downvote a post
router.put('/:id/downvote', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    post.downvotes += 1;
    await post.save();
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
