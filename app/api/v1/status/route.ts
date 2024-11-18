import { NextResponse } from 'next/server';
import statusModel from '../../../../models/statusModel';

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
	const responseData = await statusModel.buildStatusResponse();
	if (responseData.message === 'SERVER_ERROR') {
		return NextResponse.json(responseData, { status: 500 });
	}
	return NextResponse.json(responseData, { status: 200 });
}

NextResponse.next();
