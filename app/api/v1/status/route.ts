import { NextResponse } from 'next/server';
import statusModel from '../../../../models/statusModel';
import { ErrorHandler } from '../../../../utils/errorHandler';

export type ResponseData = {
	created_at: Date;
	message: string;
	database: {
		version: string;
		max_connections: number;
		active_connections: number;
	};
};
export async function GET() {
	try {
		const responseData = await statusModel.buildStatusResponse();
		return NextResponse.json(responseData, { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	} finally {
		NextResponse.next();
	}
}
