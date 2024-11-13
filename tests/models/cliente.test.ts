import prisma from '../../infra/database';
import { ClienteModel } from '../../models/clienteModel';

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
});
