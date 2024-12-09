import { createFakeUserRequest } from 'tests/common/fakeData';

describe('User', () => {
	describe('Developer and Admin', () => {
		test('Create', async () => {
			const user = createFakeUserRequest();
			const result = await fetch('http://localhost:3000/api/v1/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			expect(result.status).toBe(201);
		});

		test('Password encryption', async () => {
			const user = createFakeUserRequest();
			const result = await fetch('http://localhost:3000/api/v1/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const userCreated = await result.json();
			expect(userCreated.password).not.toBe(user.password);
		});

		test('Sign Up', async () => {
			const user = createFakeUserRequest();
			const result = await fetch('http://localhost:3000/api/v1/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const userCreated = await result.json();

			const resultLogin = await fetch(
				'http://localhost:3000/api/v1/user/signIn',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: user.email,
						password: user.password
					})
				}
			);

			const userLogged = await resultLogin.json();
			expect(userLogged).toEqual(userCreated);
		});
		test('Invalid Sign Up Request', async () => {
			const user = createFakeUserRequest();
			await fetch('http://localhost:3000/api/v1/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});

			const resultLogin = await fetch(
				'http://localhost:3000/api/v1/user/signIn',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: user.email,
						password: 'invalidPassword'
					})
				}
			);
			expect(resultLogin.status).toBe(401);
		});
	});
});
