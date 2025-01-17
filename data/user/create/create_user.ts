import { SignUpRequest, User } from 'types/dto/user';
import { ICreateUser } from './interface_create_user';
import database, { IDatabase } from 'infra/database';

export class CreateUser implements ICreateUser {
	private database: IDatabase;
	constructor(database: IDatabase) {
		this.database = database;
	}
	async create(input: SignUpRequest): Promise<User> {
		const result = await this.database.query({
			text: 'insert into public.users (name,email,password) values ($1,$2,$3) returning *;',
			values: [input.name, input.email, input.password]
		});
		return result.rows[0];
	}
}
const createUser = new CreateUser(database);
export default createUser;
