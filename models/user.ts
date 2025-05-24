import { SignInRequest, SignUpRequest, User } from 'types/dto/user';
import { Company } from 'types/dto/company';
import userRepository, { IUserRepository } from 'data/user/repository';
import authentication from './authentication';
import user_validator from 'data/user/validations';
import signIn from 'data/user/signIn';
import company from './company';

interface IUserModel {
	createUser(user: SignUpRequest): Promise<User>;
	signIn(credentials: SignInRequest): Promise<User>;
	findManyCompaniesByUserId(user_id: string): Promise<Company[]>;
}

export class UserModel implements IUserModel {
	private userRepo: IUserRepository;
	constructor(userRepo: IUserRepository) {
		this.userRepo = userRepo;
	}
	async createUser(user: SignUpRequest): Promise<User> {
		await user_validator.validadeUsername(user.username);
		await user_validator.validadeEmail(user.email);
		const hash = await authentication.hashPassword(user.password);
		const result = await this.userRepo.signUp({ ...user, password: hash });
		return result;
	}
	async signIn(credentials: SignInRequest): Promise<User> {
		const found_email = await signIn.makeSignIn({ ...credentials });
		await authentication.compare(credentials.password, found_email.password);
		return found_email;
	}
	async findManyCompaniesByUserId(user_id: string): Promise<Company[]> {
		const companies = await company.findManyCompaniesByUserId(user_id);
		return companies;
	}
}

const userModel = new UserModel(userRepository);

export default Object.freeze(userModel);
