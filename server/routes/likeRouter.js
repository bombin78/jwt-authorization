const express = require('express');
const router = express.Router();
const { LikeController } = require("../controllers");
const authenticateToken = require('../middleware/auth');

router.post('', authenticateToken, LikeController.likePost);
router.delete('/:id', authenticateToken, LikeController.unlikePost);

module.exports = router;