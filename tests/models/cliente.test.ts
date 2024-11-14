import { mockDeep } from 'jest-mock-extended';
import prisma from '../../infra/database';
import { ClienteModel } from '../../models/clienteModel';
import { PrismaClient } from '@prisma/client';

describe('ClienteModel Tests', () => {
	afterAll(async () => {
		await prisma.$connect();
		const deleteClientes = prisma.cliente.deleteMany();
		await prisma.$transaction([deleteClientes]);
		await prisma.$disconnect();
	});
	test("Caso o argumento do metodo 'criarCliente' seja invalido, deve retornar um erro", async () => {
		// Arrange
		const cliente = null;
		const clienteModel = new ClienteModel(prisma);
		// Assert
		await expect(clienteModel.criarCliente(cliente)).rejects.toThrow(
			'O argumento do metodo "criarCliente" deve ser valido'
		);
	});

	test('Caso nao encontre o cliente com o determinado ID, deve retornar um erro tratato pelo metodo', async () => {
		const prismaMock = mockDeep<PrismaClient>();
		const clienteModel = new ClienteModel(prismaMock);
		prismaMock.cliente.findUnique.mockResolvedValueOnce(null);
		const id = 1;
		await expect(clienteModel.buscarClientePorId(id)).rejects.toThrow(
			'Cliente nao encontrado'
		);
	});
});
