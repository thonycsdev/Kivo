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
	});
});
