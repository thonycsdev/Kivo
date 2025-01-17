import { faker } from '@faker-js/faker/.';
import { CreateUser } from 'data/user/create/create_user';
import signIn from 'data/user/signIn/sign_in';
import { testDatabase } from 'tests/common/setup';
import { SignUpRequest } from 'types/dto/user';

describe('Users', () => {
	test('Create', async () => {
		const inputData: SignUpRequest = {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		};

		const createUser = new CreateUser(testDatabase);
		const result = await createUser.create(inputData);
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

		const createUser = new CreateUser(testDatabase);
		await createUser.create(inputData);

		const result = await signIn.exec({
			email: inputData.email,
			password: inputData.password
		});
		expect(result).toBeDefined();
		expect(result.name).toBe(inputData.name);
	});
});
