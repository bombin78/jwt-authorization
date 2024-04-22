const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const Jdenticon = require('jdenticon');
const jwt = require('jsonwebtoken')
const { prisma } = require('../prisma/prisma-client');

const userService = require('../services/user-service');

const UserController = {
	register: async (req, res) => {
		try {
			const { email, password } = req.body;
			const userData = await userService.registration(email, password);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, // дни * часы * мин * сек * миллисекунды
				httpOnly: true, // флаг запрещающий получение и изменение куки внутри браузера
				// secure: true, // если используется https
			});
			res.json(userData);
		} catch (error) {
			console.log('Error in register:', error);
			res.status(500).json({error: 'Internal server error'});
		}
	},

	login: async(req, res) => {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({error: 'Все поля обязательны'});
		}
		
		try {
			const user = await prisma.user.findUnique({where: {email}});

			if(!user) {
				return res.status(400).json({error: 'Неверный логин или пароль'});
			}

			const valid = await bcrypt.compare(password, user.password);

			if(!valid) {
				return res.status(400).json({error: 'Неверный логин или пароль'});
			}

			const token = jwt.sign({userId: user.id }, process.env.SECRET_KEY);

			res.json({ token });
		} catch (error) {
			console.log('Login error:', error);
			res.status(500).json({error: 'Internal server error'});
		}
	},

	logout: async(req, res) => {},

	activate: async(req, res) => {},
	
	refresh: async(req, res) => {},

	getUserById: async(req, res) => {
		const { id } = req.params;
		const userId = req.user.userId;

		try {
			const user = await prisma.user.findUnique({
				where: {id},
				include: {
					followers: true,
					following: true,
				}
			});

			if(!user) {
				return res.status(404).json({ error: 'Пользователь не найден'});
			}

			const isFollowing = await prisma.follows.findFirst({
				where: {
					AND: [
						{ followerId: userId },
						{ followingId: id },
					]
				}
			});

			res.json({
				...user,
				isFollowing: Boolean(isFollowing),
			})
		} catch (error) {
			console.log('Get current error:', error);
			res.status(500).json({error: 'Internal server error'});
		}
	},

	updateUser: async(req, res) => {
		const { id } = req.params;
		const {email, name, dateOfBirth, bio, location } = req.body;

		let filePath;

		// file добавляет multer
		if(req.file && req.file.path) {
			filePath = req.file.path;
		}

		if(id !== req.user.userId) {
			return res.status(403).json({ error: 'Нет доступа'});
		}

		try {
			if (email) {
				const existingUser = await prisma.user.findFirst({
					where: { email },
				});

				if (existingUser && existingUser.id !== id) {
					return res.status(400).json({error: 'Указанный email уже используется'});
				}
			}

			const user = await prisma.user.update({
				where: { id },
				// Если значение поля = undefined,
				// то в бд оно останется без изменения
				data: {
					email: email || undefined,
					name: name || undefined,
					avatarUrl: filePath ? `/${filePath}` : undefined,
					dateOfBirth: dateOfBirth || undefined,
					bio: bio || undefined,
					location: location || undefined,
				}
			});

			res.json(user);
		} catch (error) {
			console.log('Update user error:', error);
			res.status(500).json({error: 'Internal server error'});
		}
	},

	current: async(req, res) => {
		try {
			const user = await prisma.user.findUnique({
				where: { 
					id: req.user.userId 
				},
				include: {
					followers: {
						include: {
							follower: true,
						}
					},
					following: {
						include: {
							following: true,
						}
					},
				},
			});

			if ( !user ) {
				return res.status(400).json({ error: 'Не удалось найти пользователя'})
			}

			res.json(user);
		} catch (error) {
			console.log('Get current error:', error);
			res.status(500).json({error: 'Internal server error'});
		}
	},
};

module.exports = UserController;
