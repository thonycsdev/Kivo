import database from 'infra/database';
import InterfaceDatabase from 'intefaces/interface_database';
import { SignInRequest, User } from 'types/dto/user';

export interface InterfaceSignIn {
	exec(input: SignInRequest): Promise<User>;
}

export class SignIn implements InterfaceSignIn {
	private _database: InterfaceDatabase;
	constructor(database: InterfaceDatabase) {
		this._database = database;
	}
	async exec(input: SignInRequest): Promise<User> {
		const result = await this._database.query<User>({
			text: 'SELECT * FROM users WHERE users.email = $1 and users.password = $2;',
			values: [input.email, input.password]
		});
		return result.rows[0];
	}
}
const signIn = new SignIn(database);
export default signIn;
