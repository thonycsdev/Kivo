import { faker } from '@faker-js/faker/.';
import { defaultRoles } from 'constants/defaultRoles';
import company from 'models/company';
import user from 'models/user';
import { createFakeUserRequest } from 'tests/common/fakeData';
import { CompanyInput } from 'types/dto/company';

describe('Company Model', () => {
	describe('Create', () => {
		describe('Assign', () => {
			test('User', async () => {
				const inpurUser = await createFakeUserRequest();
				const userWhoCreated = await user.createUser(inpurUser);
				const companyName = faker.company.name();
				const input: CompanyInput = {
					name: companyName,
					user_id: userWhoCreated.id
				};

				const result = await company.createCompany(input);
				expect(result.id).toBeDefined();
				expect(result.name).toBe(companyName);
				expect(result.userCompany[0].userId).toBe(userWhoCreated.id);
			});

			test('Role to User', async () => {
				const inpurUser = await createFakeUserRequest();
				const userWhoCreated = await user.createUser(inpurUser);
				const companyName = faker.company.name();
				const input: CompanyInput = {
					name: companyName,
					user_id: userWhoCreated.id
				};

				const result = await company.createCompany(input);
				expect(result.companyRole[0].role.name).toBe(defaultRoles.admin);
			});
		});
	});
});
