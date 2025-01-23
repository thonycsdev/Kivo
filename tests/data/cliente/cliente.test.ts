import { faker } from '@faker-js/faker/.';
import { ClienteRepository } from 'data/cliente/repository';
import { CompanyRepository } from 'data/company/repository';
import { RoleRepository } from 'data/role/repository';
import { UserRepository } from 'data/user/repository';
import { createFakeClient } from 'tests/common/fakeData';
import { testDatabase } from 'tests/common/setup';
import { ClientePaginationRequest } from 'types/dto/client';

describe('Cliente Data', () => {
	test('Insert', async () => {
		const cliente = await createFakeClient();
		const roleRepo = new RoleRepository(testDatabase);
		const companyRepo = new CompanyRepository(testDatabase, roleRepo);
		const userRepo = new UserRepository(testDatabase);
		const clienteRepo = new ClienteRepository(testDatabase);
		const user = await userRepo.signUp({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		});
		const company = await companyRepo.createCompany({
			user_id: user.id,
			name: faker.company.name()
		});
		cliente.company_id = company.id;
		const result = await clienteRepo.createCliente(cliente);
		expect(result.id).toBeDefined();
	});
});

describe('Get', () => {
	test('All By Company Id', async () => {
		const cliente = await createFakeClient();
		const roleRepo = new RoleRepository(testDatabase);
		const companyRepo = new CompanyRepository(testDatabase, roleRepo);
		const userRepo = new UserRepository(testDatabase);
		const clienteRepo = new ClienteRepository(testDatabase);
		const user = await userRepo.signUp({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		});
		const company = await companyRepo.createCompany({
			user_id: user.id,
			name: faker.company.name()
		});
		cliente.company_id = company.id;
		await clienteRepo.createCliente(cliente);
		const clientePagination: ClientePaginationRequest = {
			pagination: {
				page: 0,
				rowsPerPage: 10
			},
			company_id: company.id
		};
		const response =
			await clienteRepo.getAllClientsFromACompanyId(clientePagination);
		expect(response.total).toBe(1);
		expect(response.clientes[0].name).toBe(cliente.name);
	});
});
