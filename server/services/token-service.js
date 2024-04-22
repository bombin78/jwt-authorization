const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

class TokenService {
	generateToken(payload) {
		const accessToken = jwt.sign(
			payload, 
			process.env.JWT_ACCESS_SECRET,
			{
				// Время жизни токена
				expiresIn: '30m'
			}
		);

		const refreshToken = jwt.sign(
			payload, 
			process.env.JWT_REFRESH_SECRET,
			{
				// Время жизни токена
				expiresIn: '30d'
			}
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await prisma.token.findFirst({where: {userId}});
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return await prisma.user.update({
				where: { id },
				data: {
					// userId: undefined,
					refreshToken: refreshToken || undefined,
				}
			});
		}

		return await prisma.token.create({
			data: {
				userId,
				refreshToken,
			}
		});
	}
}

module.exports = new TokenService();
