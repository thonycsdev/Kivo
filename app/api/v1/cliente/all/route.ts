import { clienteModel } from 'models/client';
import { NextRequest, NextResponse } from 'next/server';
import { Pagination } from 'types/pagination';
import { ErrorHandler } from 'utils/errorHandler';

export type AllClientsRequest = {
	pagination: Pagination;
	company_id: number;
};
export async function POST(req: NextRequest) {
	try {
		const request = await req.json();
		const result = await clienteModel.buscarTodosClientes(
			request as AllClientsRequest
		);
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
export async function GET(req: NextRequest) {
	try {
		const params = req.nextUrl.searchParams;
		const name = params.get('name');
		const result = await clienteModel.getClienteByName(name);
		return NextResponse.json([result], { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
