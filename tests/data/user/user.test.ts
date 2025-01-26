import { faker } from '@faker-js/faker/.';
import { UserRepository } from 'data/user/repository';
import { testDatabase } from 'tests/common/setup';
import { SignUpRequest } from 'types/dto/user';

describe('Users', () => {
	test('Create', async () => {
		const inputData: SignUpRequest = {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		};

		const userRepo = new UserRepository(testDatabase);
		const result = await userRepo.signUp(inputData);
		expect(result.id).toBeDefined();
		expect(result.created_at).toBeDefined();
		expect(result.updated_at).toBeDefined();
		expect(result.user_company).toBeUndefined();
		expect(result.user_role).toBeUndefined();
		expect(result.password).toBe(inputData.password);
	});

	test('Sign In', async () => {
		const inputData: SignUpRequest = {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		};

		const userRepo = new UserRepository(testDatabase);
		const result = await userRepo.signUp(inputData);
		expect(result).toBeDefined();
		expect(result.name).toBe(inputData.name);
	});
});
