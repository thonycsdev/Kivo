import clientes from 'models/client';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorHandler } from 'utils/errorHandler';

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ cliente_id: string }> }
) {
	try {
		const { cliente_id } = await params;
		const result = await clientes.getSingleClienteById(cliente_id);
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
