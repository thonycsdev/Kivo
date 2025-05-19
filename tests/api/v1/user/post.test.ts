import { faker } from '@faker-js/faker/.';
import { SignUpRequest } from 'types/dto/user';

describe('Users Create', () => {
	describe('Unauthenticated User', () => {
		test('With Valid Data', async () => {
			const user_input: SignUpRequest = {
				username: faker.internet.username(),
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			};
			const result = await fetch('http://localhost:3000/api/v1/user', {
				method: 'POST',
				body: JSON.stringify(user_input)
			});

			expect(result.status).toBe(201);
			const resultBody = await result.json();

			expect(resultBody.username).toBe(user_input.username);
			expect(resultBody.password).not.toBe(user_input.password);
			expect(resultBody.email).toBe(user_input.email);
		});
		test('With Duplicated Email', async () => {
			const user_input: SignUpRequest = {
				username: faker.internet.username(),
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			};

			const user_input2: SignUpRequest = {
				name: faker.person.fullName(),
				username: faker.internet.username(),
				email: user_input.email,
				password: faker.internet.password()
			};

			const result = await fetch('http://localhost:3000/api/v1/user', {
				method: 'POST',
				body: JSON.stringify(user_input)
			});

			expect(result.status).toBe(201);

			const result2 = await fetch('http://localhost:3000/api/v1/user', {
				method: 'POST',
				body: JSON.stringify(user_input2)
			});

			expect(result2.status).toBe(400);

			const result2Body = await result2.json();

			expect(result2Body.name).toBe('Invalid Input Error');
			expect(result2Body.message).toBe(
				'Email ja cadastrato. Utilize outro ou mude sua senha.'
			);
		});

		test('With Duplicated Username', async () => {
			const user_input: SignUpRequest = {
				username: faker.internet.username(),
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			};

			const user_input2: SignUpRequest = {
				name: faker.person.fullName(),
				username: user_input.username,
				email: faker.internet.email(),
				password: faker.internet.password()
			};

			const result = await fetch('http://localhost:3000/api/v1/user', {
				method: 'POST',
				body: JSON.stringify(user_input)
			});

			expect(result.status).toBe(201);

			const result2 = await fetch('http://localhost:3000/api/v1/user', {
				method: 'POST',
				body: JSON.stringify(user_input2)
			});

			expect(result2.status).toBe(400);

			const result2Body = await result2.json();

			expect(result2Body.name).toBe('Invalid Input Error');
			expect(result2Body.message).toBe('Erro ao cadastrar o Username');
		});
	});
});
