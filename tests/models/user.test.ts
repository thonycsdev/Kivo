import { faker } from '@faker-js/faker/.';
import company from 'models/company';
import user from 'models/user';
import { createFakeUserRequest } from 'tests/common/fakeData';
import { CompanyInput } from 'types/dto/company';

describe('Users', () => {
	describe('Get', () => {
		test('Companies', async () => {
			const userInput = createFakeUserRequest();
			const userInserted = await user.createUser(userInput);
			const companyInput: CompanyInput = {
				name: faker.company.name(),
				user_id: userInserted.id
			};

			await company.createCompany(companyInput);

			const userCompanies = await user.getUserCompanies(userInserted.id);
			expect(Array.isArray(userCompanies)).toBeTruthy();
			expect(userCompanies.length).toBe(1);
		});

		test('API Request', async () => {
			const userInput = createFakeUserRequest();
			const userInserted = await user.createUser(userInput);
			const companyInput: CompanyInput = {
				name: faker.company.name(),
				user_id: userInserted.id
			};

			await company.createCompany(companyInput);
			const response = await fetch(
				`http://localhost:3000/api/v1/user/companies?user_id=${userInserted.id}`
			);
			const responseBody = await response.json();
			expect(Array.isArray(responseBody)).toBeTruthy();
			expect(responseBody.length).toBe(1);
			expect(responseBody[0].name).toBe(companyInput.name);
		});
	});
});
