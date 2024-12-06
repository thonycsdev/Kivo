import { Cliente, PrismaClient, Prisma } from '@prisma/client';
import prisma from '../infra/database';

export class ClienteModel {
	private prismaClient: PrismaClient;
	constructor(prismaClient: PrismaClient) {
		this.prismaClient = prismaClient;
	}
	async criarCliente(cliente: Cliente) {
		if (!cliente) {
			throw new Error('O argumento do metodo "criarCliente" deve ser valido');
		}
		const result = await this.prismaClient.cliente.create({
			data: cliente
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

	async buscarTodosClientes() {
		const clientes = await this.prismaClient.cliente.findMany();
		return clientes;
	}

	async atualizarCliente(cliente: Cliente) {
		if (!cliente) {
			throw new Error(
				'O argumento do metodo "atualizarCliente" deve ser valido'
			);
		}

		const payload: Prisma.ClienteCreateInput = { ...cliente };
		const result = await this.prismaClient.cliente.update({
			where: {
				id: cliente.id
			},
			data: payload
		});
		return result;
	}

	async deletarCliente(id: number) {
		try {
			const cliente = await this.prismaClient.cliente.delete({
				where: {
					id
				}
			});
			return cliente;
		} catch {
			throw new Error('Cliente nao deletado, id nao encontrado');
		}
	}

	async buscarClientePorEmail(email: string) {
		try {
			const cliente = await this.prismaClient.cliente.findFirstOrThrow({
				where: {
					email
				}
			});
			return cliente;
		} catch {
			throw new Error('Cliente nao encontrado com esse email');
		}
	}
	async buscarClientesPorNome(name: string) {
		try {
			const clientes = await this.prismaClient.cliente.findFirstOrThrow({
				where: {
					name
				}
			});
			return clientes;
		} catch {
			throw new Error('Nenhum cliente encontrado com esse nome');
		}
	}

	async buscarClientePorTelefone(phoneNumber: string) {
		try {
			const cliente = await this.prismaClient.cliente.findFirstOrThrow({
				where: {
					phoneNumber
				}
			});
			return cliente;
		} catch {
			throw new Error('Cliente nao encontrado com esse telefone');
		}
	}
}

export const clienteModel = new ClienteModel(prisma);
