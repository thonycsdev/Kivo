import database from 'infra/database';
import { Company } from 'types/dto/company';
import { Role } from 'types/dto/role';
import { SignInRequest, SignUpRequest, User } from 'types/dto/user';
import user_validator from './validations';

export interface IUserRepository {
	signIn(input: SignInRequest): Promise<User>;
	signUp(credentials: SignUpRequest): Promise<User>;
	getCompaniesByUserId(user_id: number): Promise<Company[]>;
	getUserRolesAtCompanyId(user_id: number, company_id: number): Promise<Role[]>;
}

export class UserRepository implements IUserRepository {
	async getUserRolesAtCompanyId(
		user_id: number,
		company_id: number
	): Promise<Role[]> {
		console.log(user_id, company_id);
		throw new Error();
	}
	async signIn(input: SignInRequest): Promise<User> {
		const result = await database.query({
			text: 'SELECT * FROM users WHERE users.email = $1 and users.password = $2 returning *;',
			values: [input.email, input.password]
		});
		return result.rows[0];
	}
	async signUp(user: SignUpRequest): Promise<User> {
		const result = await database.query({
			text: 'insert into users (name, username, email, password) values ($1,$2,$3,$4) returning *',
			values: [user.name, user.username, user.email, user.password]
		});
		return result.rows[0];
	}
	async getCompaniesByUserId(user_id: number): Promise<Company[]> {
		console.log(user_id);
		const query = `
		select * from companies c 
		inner join user_company uc on uc.company_id = c.id 
		where uc.user_id = $1`;
		const result = await database.query({
			text: query,
			values: [user_id]
		});

		return result.rows;
	}
}

const userRepository = new UserRepository();
export default userRepository;
