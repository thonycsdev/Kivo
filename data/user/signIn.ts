import database from 'infra/database';
import { EmailNotFound } from 'infra/errors';
import { SignInRequest } from 'types/dto/user';

export class SignIn {
	constructor() {}

	async makeSignIn(user_credentials: SignInRequest) {
		const result = await database.query({
			text: 'SELECT * FROM users u WHERE u.email = $1;',
			values: [user_credentials.email]
		});
		if (result.rowCount == 0)
			throw new EmailNotFound('Email nao existente da base de dados');
		return result.rows[0];
	}
}

const signIn = new SignIn();
export default signIn;
