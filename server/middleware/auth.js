const jwt = require('jsonwebtoken');

// Касается логина и пароля
// В next лежит следующая по порядку функция
const authenticateToken = (req, res, next) => {

	if(req.method === 'OPTIONS') {
		next();
	}

	const authHeader = req.headers['authorization'];

	const token = authHeader && authHeader.split(' ')[1];

	if(!token) {
		return res.status(401).json({error: 'Unauthorized'});
	}

	jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
		if(err) {
			return res.status(403).json({ error: 'Invalid token'});
		}

		req.user = user;

		next();
	});
};

module.exports = authenticateToken;
