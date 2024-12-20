import data_dashboard from 'models/data_dashboard';
import { NextResponse } from 'next/server';
import { ErrorHandler } from 'utils/errorHandler';

export async function GET() {
	try {
		const result = await data_dashboard.buildDashboardData();
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
