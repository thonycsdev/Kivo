import database from 'infra/database';
import { Company } from 'types/dto/company';
import { Role } from 'types/dto/role';
import { SignInRequest, SignUpRequest, User } from 'types/dto/user';
import userCreate from './create';
import signIn from './signIn';

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
		return await signIn.makeSignIn(input);
	}
	async signUp(user: SignUpRequest): Promise<User> {
		return await userCreate.createUser(user);
	}
	async getCompaniesByUserId(user_id: number): Promise<Company[]> {
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
