const express = require('express');
const router = express.Router();
const { PostController } = require("../controllers");
const authenticateToken = require('../middleware/auth');

router.post('', authenticateToken, PostController.createPost);
router.get('', authenticateToken, PostController.getAllPosts);
router.get('/:id', authenticateToken, PostController.getPostById);
router.delete('/:id', authenticateToken, PostController.deletePost);

module.exports = router;