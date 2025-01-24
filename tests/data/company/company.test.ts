import { faker } from '@faker-js/faker/.';
import { CompanyRepository } from 'data/company/repository';
import { RoleRepository } from 'data/role/repository';
import { UserRepository } from 'data/user/repository';
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
			const userRepo = new UserRepository(testDatabase);
			const roleRepo = new RoleRepository(testDatabase);
			const companyRepo = new CompanyRepository(testDatabase, roleRepo);
			const resultUser = await userRepo.signUp(user);
			const companyName = faker.company.name();
			const result = await companyRepo.createCompany({
				user_id: resultUser.id,
				name: companyName
			});
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
				const userRepo = new UserRepository(testDatabase);
				const roleRepo = new RoleRepository(testDatabase);
				const companyRepo = new CompanyRepository(testDatabase, roleRepo);

				const resultUser = await userRepo.signUp(user);

				const companyName = faker.company.name();
				const company = await companyRepo.createCompany({
					user_id: resultUser.id,
					name: companyName
				});

				const roles = await userRepo.getUserRolesAtCompanyId(
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
