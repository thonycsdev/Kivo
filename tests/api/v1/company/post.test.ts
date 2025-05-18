import { CompanyRequest } from 'types/dto/company';

describe('Company Tests', () => {
	describe('Authenticated User', () => {
		test('Create Company', async () => {
			const input: CompanyRequest = {
				name: 'Empresa1',
				cnpj: '1111111111111'
			};
			const response = await fetch('http://localhost:3000/api/v1/company', {
				method: 'POST',
				body: JSON.stringify(input)
			});
			expect(response.status).toBe(201);
			const responseBody = await response.json();
			expect(responseBody.name).toBe(input.name);
			expect(responseBody.cnpj).toBe(input.cnpj);
			expect(responseBody.id).toBeDefined();
			expect(responseBody.created_at).toBeDefined();
		});
	});
});
