import clientes from 'models/client';
import { NextResponse } from 'next/server';
import { ClienteRequest } from 'types/dto/client';
import { ErrorHandler } from 'utils/errorHandler';

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const newCliente = payload as ClienteRequest;
		const result = await clientes.createCliente(newCliente);
		return NextResponse.json(result, { status: 201 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
