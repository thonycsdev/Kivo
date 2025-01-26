import { SignInRequest, SignUpRequest, User } from 'types/dto/user';
import { Company } from 'types/dto/company';
import userRepository, { IUserRepository } from 'data/user/repository';
import authentication from './authentication';

interface IUserModel {
	createUser(user: SignUpRequest): Promise<User>;
	signIn(credentials: SignInRequest): Promise<User>;
	getUserCompanies(userId: number): Promise<Company[]>;
}

export class UserModel implements IUserModel {
	private userRepo: IUserRepository;
	constructor(userRepo: IUserRepository) {
		this.userRepo = userRepo;
	}
	async createUser(user: SignUpRequest): Promise<User> {
		if (!user) throw new Error('Invalid Input');
		user.password = await authentication.hashPassword(user.password);
		const result = await this.userRepo.signUp(user);
		return result;
	}
	async signIn(credentials: SignInRequest): Promise<User> {
		credentials.password = await authentication.hashPassword(
			credentials.password
		);
		const result = await this.userRepo.signIn(credentials);
		return result;
	}
	async getUserCompanies(userId: number): Promise<Company[]> {
		const result = await this.userRepo.getCompaniesByUserId(userId);
		return result;
	}
}

const userModel = new UserModel(userRepository);

export default Object.freeze(userModel);
