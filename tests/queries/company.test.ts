import { faker } from '@faker-js/faker/.';
import createCompany from 'queries/company/create/create';
import createUser from 'queries/user/create/create_user';
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

			const result = await createCompany.create(resultUser.id, companyName);
			expect(result.name).toBe(companyName);
			expect(result.roles.length).toBe(1);

			console.log(result);
			expect(result.user.id).toBe(resultUser.id);
		});
	});
});
