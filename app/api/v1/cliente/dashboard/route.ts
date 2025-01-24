import dashboardModel from 'models/dashboard';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorHandler } from 'utils/errorHandler';

export async function GET(req: NextRequest) {
	try {
		const params = req.nextUrl.searchParams;
		const id = params.get('company_id');
		const result = await dashboardModel.getData(+id);
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
