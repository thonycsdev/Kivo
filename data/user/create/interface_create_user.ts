import { SignUpRequest, User } from 'types/dto/user';

export interface ICreateUser {
	create(input: SignUpRequest): Promise<User>;
}
