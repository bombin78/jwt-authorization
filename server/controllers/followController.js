const { prisma } = require('../prisma/prisma-client');

const FollowController = {
	followUser: async (req, res) => {
		const { followingId } = req.body;
		const userId = req.user.userId;

		if(followingId === userId) {
			return res.status(500).json({ error: 'Вы не можете подписываться на себя'});
		}

		try {
			const existingUser = await prisma.user.findUnique({where: { id: followingId }});

			if (!existingUser) {
				return res.status(404).json({ error: 'Вы хотите подписаться на несуществующего пользователя' });
			}

			const existingFollow = await prisma.follows.findFirst({
				where: {
					AND: [
						{ followerId: userId },
						{ followingId }
					],
				}
			});

			if( existingFollow ) {
				return res.status(400).json({ error: 'Подписка уже существует'});
			}
			
			await prisma.follows.create({
				data: {
					follower: {connect: { id: userId }},
					following: {connect: { id: followingId }},
				}
			});

			res.status(201).json({message: 'Подписка успешно создана'});
		} catch (error) {
			console.log('Follow user error:', error);
			res.status(500).json({error: 'Internal server error'});
		}
	},

	unfollowUser: async (req, res) => {
		const { id } = req.params;
		const userId = req.user.userId;

		try {
			const follow = await prisma.follows.findFirst({
				where: {
					AND: [
						{ followerId: userId },
						{ followingId: id }
					],
				}
			});

			if( !follow ) {
				return res.status(404).json({ error: 'Подписка не найдена'});
			}

			await prisma.follows.delete({
				where: { id: follow.id }
			});

			res.status(201).json({message: 'Вы успешно отписались'});
		} catch (error) {
			console.log('Unfollow user error:', error);
			res.status(500).json({error: 'Internal server error'});
		}
	},
};

module.exports = FollowController;
