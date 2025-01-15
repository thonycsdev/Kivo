import { SignInRequest, SignUpRequest, User } from 'types/dto/user';
import { Company } from 'types/dto/company';

interface IUserModel {
	createUser(user: SignUpRequest): Promise<User>;
	signIn(credentials: SignInRequest): Promise<User>;
	getUserCompanies(userId: number): Promise<Company[]>;
}

export class UserModel implements IUserModel {
	constructor() {}
	createUser(user: SignUpRequest): Promise<User> {
		throw new Error('Method not implemented.');
	}
	signIn(credentials: SignInRequest): Promise<User> {
		throw new Error('Method not implemented.');
	}
	getUserCompanies(userId: number): Promise<Company[]> {
		throw new Error('Method not implemented.');
	}
}

const userModel = new UserModel();

export default Object.freeze(userModel);
