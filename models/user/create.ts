import { IModel } from 'intefaces/model_interface';
import { CreateUser } from 'data/user/create/create_user';
import { SignUpRequest, User } from 'types/dto/user';

export class CreateUserModel implements IModel<SignUpRequest, User> {
	private database: CreateUser;
	constructor(database: CreateUser) {
		this.database = database;
	}
	async execute(input: SignUpRequest): Promise<User> {
		const result = await this.database.create(input);
		return result;
	}
}
