import { SignUpRequest, User } from 'types/dto/user';
import { ICreateUser } from './interface_create_user';
import InterfaceDatabase from 'intefaces/interface_database';
import database from 'infra/database';

export class CreateUser implements ICreateUser {
	private interfaceDatabase: InterfaceDatabase;
	constructor(interfaceDatabase: InterfaceDatabase) {
		this.interfaceDatabase = interfaceDatabase;
	}
	async create(input: SignUpRequest): Promise<User> {
		const result = await this.interfaceDatabase.query<User>({
			text: 'insert into public.users (name,email,password) values ($1,$2,$3) returning *;',
			values: [input.name, input.email, input.password]
		});
		return result.rows[0];
	}
}
const createUser = new CreateUser(database);
export default createUser;
