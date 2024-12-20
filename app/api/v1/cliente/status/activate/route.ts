import { clienteModel } from 'models/client';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
	try {
		const payload = await request.json();
		const clienteId = payload.clienteId;
		const result = await clienteModel.activate(clienteId);
		return NextResponse.json(result, {
			status: 200
		});
	} catch (err) {
		return NextResponse.json(err, {
			status: err.status_code
		});
	}
}
