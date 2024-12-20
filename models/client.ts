import { Cliente, Prisma, PrismaClient } from '@prisma/client';
import IClient from 'intefaces/IClient';
import selling_potential from './selling_potential';

export default class Client implements IClient {
	private prismaClient: PrismaClient;
	constructor(prismaClient: PrismaClient) {
		this.prismaClient = prismaClient;
	}
	async addClient(client: Prisma.ClienteCreateInput): Promise<Cliente> {
		if (!client) {
			throw new Error('O argumento do metodo "criarCliente" deve ser valido');
		}
		selling_potential.addSellingPotential(client);
		const result = await this.prismaClient.cliente.create({
			data: client
		});
		return result;
	}
}
