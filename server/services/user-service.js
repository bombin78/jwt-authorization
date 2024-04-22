const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const { prisma } = require('../prisma/prisma-client');

class UserService {
	async registration(email, password) {
		const candidate = await prisma.user.findUnique({where: {email}});

		if(candidate) {
			throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
		}

		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const user = await prisma.user.create({
			data: {
				email,
				password: hashPassword,
				activationLink
				// name,
				// avatarUrl: `/uploads/${avatarName}`,
			}
		});
		await mailService.sendActivationMail(email, activationLink);
		// TODO: Уточнить, точно ли в user _id, а не id,
		// при необходимости поправить класс userDto.
		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({...userDto});
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		}
	}
}

module.exports = new UserService();
