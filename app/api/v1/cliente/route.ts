import { clienteModel } from '../../../../models/clienteModel';
import { Cliente } from '@prisma/client';

export async function GET() {
	const result = await clienteModel.buscarTodosClientes();
	return Response.json(result, { status: 200 });
}

export async function POST(request: Request) {
	const payload = (await request.json()) as Cliente;
	const result = await clienteModel.criarCliente(payload);
	return Response.json(result, { status: 201 });
}
