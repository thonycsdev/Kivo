import { faker } from '@faker-js/faker/.';
import user from 'models/user';
import { CompanyRequest } from 'types/dto/company';
import { SignUpRequest } from 'types/dto/user';

describe('/api/v1/company', () => {
	describe('Authenticated User', () => {
		test('Create Company', async () => {
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
			const response = await fetch('http://localhost:3000/api/v1/company', {
				method: 'POST',
				body: JSON.stringify(input)
			});

			expect(response.status).toBe(201);
			const responseBody = await response.json();
			expect(responseBody.name).toBe(input.name);
			expect(responseBody.cnpj).toBe(input.cnpj);
			expect(responseBody.id).toBeDefined();
		});
	});
});
