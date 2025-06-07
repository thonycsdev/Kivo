import database from 'infra/database';
import { InvalidInput } from 'infra/errors';

export interface IValidations {
	validadeEmail(email: string): Promise<void>;
	validadeUsername(username: string): Promise<void>;
}

export class Validations implements IValidations {
	async validadeEmail(email: string): Promise<void> {
		const email_check = await database.query({
			text: `SELECT email FROM users WHERE email = $1`,
			values: [email]
		});

		if (email_check.rowCount > 0) {
			throw new InvalidInput(
				'Email ja cadastrato. Utilize outro ou mude sua senha.'
			);
		}
	}
	async validadeUsername(username: string): Promise<void> {
		const email_check = await database.query({
			text: `SELECT username FROM users WHERE username = $1`,
			values: [username]
		});

		if (email_check.rowCount > 0) {
			throw new InvalidInput('Erro ao cadastrar o Username');
		}
	}
}

const user_validator = new Validations();

export default user_validator;
