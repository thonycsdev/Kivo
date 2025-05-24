import user from 'models/user';
import { NextResponse } from 'next/server';
import { ErrorHandler } from 'utils/errorHandler';

export async function GET(
	_: Request,
	{ params }: { params: Promise<{ user_id: string }> }
) {
	try {
		const user_id = (await params).user_id;
		const result = await user.findManyCompaniesByUserId(user_id);
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
