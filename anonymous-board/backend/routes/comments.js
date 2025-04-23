const express = require('express');
const router = express.Router();
const { Comment, Post } = require('../models');

// Get all comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      order: [['createdAt', 'DESC']]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      postId: req.body.postId
    });
    
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Upvote a comment
router.put('/:id/upvote', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    
    comment.upvotes += 1;
    await comment.save();
    
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Downvote a comment
router.put('/:id/downvote', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    
    comment.downvotes += 1;
    await comment.save();
    
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
