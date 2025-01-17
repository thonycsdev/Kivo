import { faker } from '@faker-js/faker/.';
import { CreateCompany } from 'data/company/create/create';
import { CreateRole } from 'data/role/create/create';
import createUser from 'data/user/create/create_user';
import { UserGet } from 'data/user/get/get';
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

			expect(result.user.id).toBe(resultUser.id);
		});
		describe('Owner', () => {
			test('Owner Role', async () => {
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
				const company = await createCompany.create(resultUser.id, companyName);

				const getBy = new UserGet(testDatabase);
				const roles = await getBy.getUserRolesAtCompany(
					resultUser.id,
					company.id
				);
				expect(roles).toBeDefined();
				expect(Array.isArray(roles)).toBeTruthy();
				expect(roles[0].name).toBe('ADMIN');
			});
		});
	});
});
