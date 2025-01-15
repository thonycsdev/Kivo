import { createFakeUserRequest } from 'tests/common/fakeData';

describe('User Login', () => {
	describe('Developer and Admin', () => {
		test('Create', async () => {
			const user = createFakeUserRequest();
			const result = await fetch('http://localhost:3000/api/v1/user/signUp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...user,
					admin_password: process.env.ADMIN_PASSWD
				})
			});
			expect(result.status).toBe(201);
		});

		test('Password encryption', async () => {
			const user = createFakeUserRequest();
			const result = await fetch('http://localhost:3000/api/v1/user/signUp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...user,
					admin_password: process.env.ADMIN_PASSWD
				})
			});
			const userCreated = await result.json();
			expect(userCreated.password).not.toBe(user.password);
		});
	});
	describe('Unauthenticated User', () => {
		test('Sign Up', async () => {
			const user = createFakeUserRequest();
			const result = await fetch('http://localhost:3000/api/v1/user/signUp', {
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
			expect(userLogged.name).toBe(userCreated.name);
		});
		test('Invalid Sign Up Request', async () => {
			const user = createFakeUserRequest();
			await fetch('http://localhost:3000/api/v1/user/signUp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...user,
					admin_password: process.env.ADMIN_PASSWD
				})
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
						password: 'invalidPassword',
						admin_password: process.env.ADMIN_PASSWD
					})
				}
			);
			expect(resultLogin.status).toBe(401);
		});
	});
});
