import { Prisma, User } from '@prisma/client';
import prisma from 'infra/database';
import authentication from './authentication';

async function createUser(user: Prisma.UserCreateInput): Promise<User> {
	user.password = await authentication.hashPassword(user.password);
	const userAdded = await prisma.user.create({
		data: user
	});
	return userAdded;
}

export default Object.freeze({
	createUser
});
