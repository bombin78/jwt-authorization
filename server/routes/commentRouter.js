const express = require('express');
const router = express.Router();
const { CommentController } = require("../controllers");
const authenticateToken = require('../middleware/auth');

router.post('', authenticateToken, CommentController.createComment);
router.delete('/:id', authenticateToken, CommentController.deleteComment);

module.exports = router;