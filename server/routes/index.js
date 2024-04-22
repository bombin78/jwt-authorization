const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const commentRouter = require('./commentRouter');
const likeRouter = require('./likeRouter');
const followRouter = require('./followRouter');

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/likes', likeRouter);
router.use('/follows', followRouter);

module.exports = router;
