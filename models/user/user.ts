import { SignInRequest, SignUpRequest, User } from 'types/dto/user';
import { Company } from 'types/dto/company';
import database, { IDatabase } from 'infra/database';
import getUserCompanies, {
	IGetUserCompanies
} from 'data/company/get/getUserCompanies';
import signIn, { InterfaceSignIn } from 'data/user/signIn/sign_in';

interface IUserModel {
	createUser(user: SignUpRequest): Promise<User>;
	signIn(credentials: SignInRequest): Promise<User>;
	getUserCompanies(userId: number): Promise<Company[]>;
}

export class UserModel implements IUserModel {
	private database: IDatabase;
	private getCompanies: IGetUserCompanies;
	private signInService: InterfaceSignIn;
	constructor(
		database: IDatabase,
		getCompanies: IGetUserCompanies,
		signIn: InterfaceSignIn
	) {
		this.database = database;
		this.getCompanies = getCompanies;
		this.signInService = signIn;
	}
	async createUser(user: SignUpRequest): Promise<User> {
		const result = await this.database.query({
			text: 'insert into users (name, email, password) values ($1,$2,$3) returning *',
			values: [user.name, user.email, user.password]
		});
		return result.rows[0];
	}
	signIn(credentials: SignInRequest): Promise<User> {
		const result = this.signInService.exec(credentials);
		return result;
	}
	async getUserCompanies(userId: number): Promise<Company[]> {
		const result = await this.getCompanies.exec(userId);
		return result;
	}
}

const userModel = new UserModel(database, getUserCompanies, signIn);

export default Object.freeze(userModel);
