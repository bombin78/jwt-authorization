const express = require('express');
const router = express.Router();
const { FollowController } = require("../controllers");
const authenticateToken = require('../middleware/auth');

router.post('', authenticateToken, FollowController.followUser);
router.delete('/:id', authenticateToken, FollowController.unfollowUser);

module.exports = router;