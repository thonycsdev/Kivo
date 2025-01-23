import database, { IDatabase } from 'infra/database';
import { Company } from 'types/dto/company';
import { Role } from 'types/dto/role';
import { SignInRequest, SignUpRequest, User } from 'types/dto/user';

export interface IUserRepository {
	signIn(input: SignInRequest): Promise<User>;
	signUp(credentials: SignUpRequest): Promise<User>;
	getCompaniesByUserId(user_id: number): Promise<Company[]>;
	getUserRolesAtCompanyId(user_id: number, company_id: number): Promise<Role[]>;
}

export class UserRepository implements IUserRepository {
	private database: IDatabase;
	constructor(database: IDatabase) {
		this.database = database;
	}
	async getUserRolesAtCompanyId(
		user_id: number,
		company_id: number
	): Promise<Role[]> {
		const query = `select r.* from roles r 
						inner join user_role ur on r.id = ur.role_id
						inner join user_company uc on ur.user_id  = uc.user_id
						where uc.company_id = $1 and uc.user_id = $2`;
		const result = await this.database.query({
			text: query,
			values: [company_id, user_id]
		});
		return result.rows;
	}
	async signIn(input: SignInRequest): Promise<User> {
		const result = await this.database.query({
			text: 'SELECT * FROM users WHERE users.email = $1 and users.password = $2 returning *;',
			values: [input.email, input.password]
		});
		return result.rows[0];
	}
	async signUp(user: SignUpRequest): Promise<User> {
		const result = await this.database.query({
			text: 'insert into users (name, email, password) values ($1,$2,$3) returning *',
			values: [user.name, user.email, user.password]
		});
		return result.rows[0];
	}
	getCompaniesByUserId(user_id: number): Promise<Company[]> {
		console.log(user_id);
		throw new Error('Method not implemented.');
	}
}
const userRepository = new UserRepository(database);
export default userRepository;
