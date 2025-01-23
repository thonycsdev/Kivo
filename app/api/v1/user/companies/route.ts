import user from 'models/user';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorHandler } from 'utils/errorHandler';

export async function GET(req: NextRequest) {
	try {
		const params = req.nextUrl.searchParams;
		const id = params.get('user_id');
		const result = await user.getUserCompanies(+id);
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
