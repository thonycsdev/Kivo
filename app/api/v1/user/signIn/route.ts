import user from 'models/user';
import { NextResponse } from 'next/server';
import { Credential } from 'types/credential';

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const credentials = payload as Credential;
		const userLogged = await user.SignIn(credentials);
		return NextResponse.json(userLogged, { status: 201 });
	} catch (err) {
		return NextResponse.json(err, {
			status: err.status_code
		});
	}
}
