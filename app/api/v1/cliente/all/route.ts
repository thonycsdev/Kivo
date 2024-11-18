import { clienteModel } from '../../../../../models/clienteModel';

export async function GET() {
	const result = await clienteModel.buscarTodosClientes();
	return Response.json(result, { status: 200 });
}
