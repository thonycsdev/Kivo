import user from 'models/user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const authentication_result = await user.signIn({ ...payload });
		return NextResponse.json(authentication_result, { status: 200 });
	} catch (err) {
		return NextResponse.json(err, {
			status: err.status_code
		});
	}
}
