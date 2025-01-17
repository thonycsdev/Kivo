import { faker } from '@faker-js/faker/.';
import { CreateCompany } from 'queries/company/create/create';
import { CreateRole } from 'queries/role/create/create';
import createUser from 'queries/user/create/create_user';
import { testDatabase } from 'tests/common/setup';
import { SignUpRequest } from 'types/dto/user';

describe('Company Query', () => {
	describe('Create', () => {
		test('With default admin Role and Owner', async () => {
			const user: SignUpRequest = {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			};
			const resultUser = await createUser.create(user);
			const companyName = faker.company.name();
			const createCompany = new CreateCompany(
				testDatabase,
				new CreateRole(testDatabase)
			);
			const result = await createCompany.create(resultUser.id, companyName);
			expect(result.name).toBe(companyName);
			expect(result.roles.length).toBe(1);

			console.log(result);
			expect(result.user.id).toBe(resultUser.id);
		});
		test('2With default admin Role and Owner', async () => {
			const user: SignUpRequest = {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			};
			const resultUser = await createUser.create(user);
			const companyName = faker.company.name();

			const createCompany = new CreateCompany(
				testDatabase,
				new CreateRole(testDatabase)
			);
			const result = await createCompany.create(resultUser.id, companyName);
			expect(result.name).toBe(companyName);
			expect(result.roles.length).toBe(1);

			console.log(result);
			expect(result.user.id).toBe(resultUser.id);
		});
	});
});
