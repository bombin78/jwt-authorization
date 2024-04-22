const express = require('express');
const router = express.Router();
const { UserController } = require("../controllers");
const authenticateToken = require('../middleware/auth');
const uploadDestination = 'uploads';
// https://www.npmjs.com/package/multer
// https://github.com/expressjs/multer/blob/master/doc/README-ru.md
const multer = require('multer');

// Показываем, где хранить файлы
const storage = multer.diskStorage({
	destination: uploadDestination,
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const upload = multer({storage});

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/current', authenticateToken, UserController.current);
router.get('/:id', authenticateToken, UserController.getUserById);
router.put('/:id', authenticateToken, upload.single('avatar'), UserController.updateUser);

module.exports = router;