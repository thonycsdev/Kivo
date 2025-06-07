import { faker } from '@faker-js/faker/.';
import company from 'models/company';
import user from 'models/user';
import { CompanyRequest } from 'types/dto/company';
import { SignUpRequest } from 'types/dto/user';

describe('/api/v1/user/companies', () => {
	test('Find Companies By User ID', async () => {
		const user_create_input: SignUpRequest = {
			email: faker.internet.email(),
			username: faker.internet.username(),
			name: faker.person.fullName(),
			password: faker.internet.password()
		};

		const user_created = await user.createUser(user_create_input);
		const input: CompanyRequest = {
			name: faker.company.name(),
			cnpj: faker.internet.password(),
			user_id: user_created.id.toString()
		};
		const company_created = await company.createCompany(input);
		const response = await fetch(
			`http://localhost:3000/api/v1/user/companies/${user_created.id}`
		);
		expect(response.status).toBe(200);

		const responseBody = await response.json();

		expect(responseBody[0].id).toBe(company_created.id);
		expect(responseBody.length).toBe(1);
	});
});
