import { NextResponse } from 'next/server';
import { ErrorHandler } from 'utils/errorHandler';

export async function GET() {
	try {
		const result = {
			active_clients: 2,
			this_month_clients: 1,
			uncontacted_clients: 5
		};
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
