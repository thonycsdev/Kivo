import { Cliente, PrismaClient } from '@prisma/client';

export class ClienteModel {
	private prismaClient: PrismaClient;
	constructor(prismaClient: PrismaClient) {
		this.prismaClient = prismaClient;
	}
	async criarCliente(cliente: Cliente) {
		if (!cliente) {
			throw new Error('O argumento do metodo "criarCliente" deve ser valido');
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, criadoEm, atualizadoEm, ...payload } = cliente;
		const result = await this.prismaClient.cliente.create({
			data: payload
		});
		return result;
	}

	async buscarClientePorId(id: number) {
		const cliente = await this.prismaClient.cliente.findUnique({
			where: {
				id
			}
		});
		if (!cliente) {
			throw new Error('Cliente nao encontrado');
		}
		return cliente;
	}
}
