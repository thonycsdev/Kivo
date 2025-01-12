import { Prisma, User } from '@prisma/client';
import prisma from 'infra/database';
import authentication from './authentication';
import { Credential } from 'types/credential';
import { ErrorHandler } from 'utils/errorHandler';

async function createUser(user: Prisma.UserCreateInput): Promise<User> {
	user.password = await authentication.hashPassword(user.password);
	const userAdded = await prisma.user.create({
		data: user
	});
	return userAdded;
}

async function SignIn(credentials: Credential): Promise<User> {
	const user = await prisma.user.findUnique({
		where: {
			email: credentials.email
		},
		include: {
			userCompany: true,
			userRole: true
		}
	});
	if (!user) {
		const error = ErrorHandler.create(new Error('User not found'), 404);
		error.addSolution('Check your email');
		throw error;
	}
	const isSame = await authentication.compare(
		credentials.password,
		user.password
	);
	if (!isSame) {
		const error = ErrorHandler.create(new Error('Invalid Password'), 401);
		error.addSolution('Check your password');
		throw error;
	}
	return user;
}

export default Object.freeze({
	createUser,
	SignIn
});
