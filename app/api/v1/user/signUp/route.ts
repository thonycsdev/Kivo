import { Prisma } from '@prisma/client';
import admin from 'models/admin';
import user from 'models/user';
import { NextResponse } from 'next/server';
import { ErrorHandler } from 'utils/errorHandler';

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		console.log({ payload });
		if (!admin.verifyAdmin(payload.admin_password))
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

		const entity = {
			email: payload.email,
			password: payload.password,
			name: payload.name
		} as Prisma.UserCreateInput;
		const createUserResult = await user.createUser(entity);
		console.log({ createUserResult });
		return NextResponse.json(createUserResult, { status: 201 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
