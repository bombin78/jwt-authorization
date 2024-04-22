// DTO (Data Transfer Object - Объект передачи данных)
module.exports = class UserDto {
	email;
	id;
	isActivated;

	constructor(model) {
		this.email = model.email;
		this.id = model.id;
		this.isActivated = model.isActivated;
	}
};
