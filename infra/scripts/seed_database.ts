import { clienteModel } from 'models/client';
import { createFakeClient } from 'tests/common/fakeData';
import { ClientRequest } from 'types/dto/client';

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

async function addManyClientsInDatabase(clients: ClientRequest[]) {
	clients.forEach(async (x) => {
		await clienteModel.createCliente(x);
	});
}

plantSeed();
