import { NextResponse } from 'next/server';
import { Cliente } from '@prisma/client';
import { ErrorHandler } from 'utils/errorHandler';
import { clienteModel } from 'models/clienteModel';

export async function GET() {
	try {
		const result = await clienteModel.buscarTodosClientes();
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
		const newCliente = payload as Cliente;
		const result = await clienteModel.criarCliente(newCliente);
		return NextResponse.json(result, { status: 201 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
