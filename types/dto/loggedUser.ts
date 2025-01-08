import { User } from '@prisma/client';

export interface LoggedUser extends User {
	phoneNumber: string;
	address: string;
	companies: [];
}
