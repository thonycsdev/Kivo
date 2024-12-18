import { clienteModel } from 'models/clienteModel';
import { NextRequest, NextResponse } from 'next/server';
import { Pagination } from 'types/pagination';
import { ErrorHandler } from 'utils/errorHandler';

export async function POST(req: NextRequest) {
	try {
		const pagination: Pagination = await req.json();
		const result = await clienteModel.buscarTodosClientes(pagination);
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
		console.log(name);
		const result = await clienteModel.buscarClientesPorNome(name);
		return NextResponse.json([result], { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
