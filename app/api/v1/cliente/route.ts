import { NextResponse } from 'next/server';
import { ErrorHandler } from 'utils/errorHandler';
import { clienteModel } from 'models/client';
import { Client } from 'types/dto/client';

export async function GET() {
	try {
		const result = await clienteModel.buscarTodosClientes({
			company_id: 0,
			pagination: { page: 0, rowsPerPage: 10 }
		});
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const newCliente = payload as Client;
		const result = await clienteModel.criarCliente(newCliente);
		return NextResponse.json(result, { status: 201 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
