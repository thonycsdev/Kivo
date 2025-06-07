import { ClienteRequest } from 'types/dto/client';

describe('Cliente Model Tests', () => {
	describe('Authenticated User', () => {
		test('Create Cliente', async () => {
			const cliente: ClienteRequest = {
				name: 'Anthony'
			};
			const new_client = await fetch('http://localhost:3000/api/v1/cliente', {
				method: 'POST',
				body: JSON.stringify(cliente)
			});

			expect(new_client.status).toBe(201);
			const responseBody = await new_client.json();
			expect(responseBody.name).toBe('Anthony');
			expect(responseBody.id).toBeDefined();
			expect(responseBody.created_at).toBeDefined();
		});
		test('Get Cliente By Id', async () => {
			const cliente: ClienteRequest = {
				name: 'Anthony'
			};
			const new_client = await fetch('http://localhost:3000/api/v1/cliente', {
				method: 'POST',
				body: JSON.stringify(cliente)
			});

			expect(new_client.status).toBe(201);

			const response = await fetch('http://localhost:3000/api/v1/cliente/1', {
				method: 'GET'
			});

			expect(response.status).toBe(200);
			const responseBody = await response.json();
			expect(responseBody.id).toBe(1);
			expect(responseBody.name).toBe('Anthony');
			expect(responseBody.created_at).toBeDefined();
		});
	});
});
