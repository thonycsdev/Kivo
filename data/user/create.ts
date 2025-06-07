import database from 'infra/database';
import { SignUpRequest, User } from 'types/dto/user';

export class Create {
	constructor() {}

	async createUser(user: SignUpRequest): Promise<User> {
		const result = await database.query({
			text: 'insert into users (name, username, email, password) values ($1,$2,$3,$4) returning *',
			values: [user.name, user.username, user.email, user.password]
		});
		return result.rows[0];
	}
}

const userCreate = new Create();
export default userCreate;
