import { ClienteRequest } from 'types/dto/client';
import { CompanyRequest } from 'types/dto/company';

describe('Cliente Model Tests', () => {
	describe('Authenticated User', () => {
		test('Create Cliente', async () => {
			const input: CompanyRequest = {
				name: 'Empresa1',
				cnpj: '1111111111111'
			};
			const response = await fetch('http://localhost:3000/api/v1/company', {
				method: 'POST',
				body: JSON.stringify(input)
			});
			const responseBodyInsertCompany = await response.json();

			const cliente: ClienteRequest = {
				name: 'Anthony',
				company_id: responseBodyInsertCompany.id
			};

			const new_client = await fetch('http://localhost:3000/api/v1/cliente', {
				method: 'POST',
				body: JSON.stringify(cliente)
			});

			expect(new_client.status).toBe(201);
			const responseBody = await new_client.json();
			expect(responseBody.name).toBe('Anthony');
			expect(responseBody.id).toBeDefined();
			expect(responseBody.company_id).toBeDefined();
			expect(responseBody.created_at).toBeDefined();
		});
	});
});
