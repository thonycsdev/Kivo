import { Prisma } from '@prisma/client';
import { clienteModel } from 'models/client';
import { createFakeClient } from 'tests/common/fakeData';

async function plantSeed() {
	const clients = await create100FakeClients();
	await addManyClientsInDatabase(clients);
}

async function create100FakeClients() {
	const clients = [];

	for (let i = 0; i < 100; i++) {
		const client = await createFakeClient();
		clients.push(client);
	}

	return clients;
}

async function addManyClientsInDatabase(clients: Prisma.ClienteCreateInput[]) {
	clients.forEach(async (x) => {
		await clienteModel.criarCliente(x);
	});
}

plantSeed();
