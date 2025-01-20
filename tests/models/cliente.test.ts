import { faker } from '@faker-js/faker/.';
import { AllClientsRequest } from 'app/api/v1/cliente/all/route';
import { CreateCompany } from 'data/company/create/create';
import { CreateRole } from 'data/role/create/create';
import { CreateUser } from 'data/user/create/create_user';
import { ClienteModel } from 'models/client';
import { createFakeClient } from 'tests/common/fakeData';
import { testDatabase } from 'tests/common/setup';

describe('Cliente Model', () => {
	describe('Update Cliente', () => {
		test('True', () => {
			expect(true).toBeTruthy();
		});
	});

	test('Insert', async () => {
		const cliente = await createFakeClient();
		const modelCliente = new ClienteModel(testDatabase);
		const cliente_company = new CreateCompany(
			testDatabase,
			new CreateRole(testDatabase)
		);
		const user_admin = new CreateUser(testDatabase);
		const user = await user_admin.create({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		});
		const company = await cliente_company.exec({
			user_id: user.id,
			name: faker.company.name()
		});
		cliente.company_id = company.id;
		const result = await modelCliente.criarCliente(cliente);
		expect(result.id).toBeDefined();
	});
	describe('By Company', () => {
		test('Id', async () => {
			const cliente = await createFakeClient();
			const modelCliente = new ClienteModel(testDatabase);
			const cliente_company = new CreateCompany(
				testDatabase,
				new CreateRole(testDatabase)
			);
			const user_admin = new CreateUser(testDatabase);
			const user = await user_admin.create({
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			});
			const company = await cliente_company.exec({
				user_id: user.id,
				name: faker.company.name()
			});
			cliente.company_id = company.id;
			await modelCliente.criarCliente(cliente);

			const request: AllClientsRequest = {
				pagination: {
					page: 0,
					rowsPerPage: 10
				},
				company_id: company.id
			};
			const response = await modelCliente.buscarTodosClientes(request);
			expect(response.total).toBe(1);
			expect(response.clientes[0].name).toBe(cliente.name);
		});
	});
});
