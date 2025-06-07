import user from 'models/user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const createUserResult = await user.createUser({ ...payload });
		return NextResponse.json(createUserResult, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json(err, {
			status: err.status_code
		});
	}
}
