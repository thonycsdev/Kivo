import { faker } from '@faker-js/faker/.';
import user from 'models/user';
import { SignInRequest, SignUpRequest } from 'types/dto/user';

describe('User Authentication', () => {
	describe('Unauthenticated User', () => {
		test('Authenticate With Valid Data', async () => {
			const user_create_input: SignUpRequest = {
				email: faker.internet.email(),
				username: faker.internet.username(),
				name: faker.person.fullName(),
				password: faker.internet.password()
			};

			await user.createUser(user_create_input);

			const credentials: SignInRequest = {
				password: user_create_input.password,
				email: user_create_input.email
			};

			const response = await fetch(
				'http://localhost:3000/api/v1/user/authentication',
				{
					method: 'POST',
					body: JSON.stringify(credentials)
				}
			);

			expect(response.status).toBe(200);
			const responseBody = await response.json();
			expect(responseBody.name).toBe(user_create_input.name);
		});
		test('Incorrect Email', async () => {
			const user_create_input: SignUpRequest = {
				email: faker.internet.email(),
				username: faker.internet.username(),
				name: faker.person.fullName(),
				password: faker.internet.password()
			};

			await user.createUser(user_create_input);

			const credentials: SignInRequest = {
				password: user_create_input.password,
				email: faker.internet.email()
			};

			const response = await fetch(
				'http://localhost:3000/api/v1/user/authentication',
				{
					method: 'POST',
					body: JSON.stringify(credentials)
				}
			);

			expect(response.status).toBe(404);
		});
		test('Incorrect Password', async () => {
			const user_create_input: SignUpRequest = {
				email: faker.internet.email(),
				username: faker.internet.username(),
				name: faker.person.fullName(),
				password: faker.internet.password()
			};

			await user.createUser(user_create_input);

			const credentials: SignInRequest = {
				password: faker.internet.password(),
				email: user_create_input.email
			};

			const response = await fetch(
				'http://localhost:3000/api/v1/user/authentication',
				{
					method: 'POST',
					body: JSON.stringify(credentials)
				}
			);

			expect(response.status).toBe(405);
		});
	});
});
