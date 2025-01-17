import { ClienteModel } from 'models/client';
import { createFakeClient } from 'tests/common/fakeData';
import { testDatabase } from 'tests/common/setup';

describe('Cliente Queries', () => {
	describe('Insert', () => {
		test('Default Values', async () => {
			const request = await createFakeClient();
			const clientModel = new ClienteModel(testDatabase);
			const result = await clientModel.criarCliente(request);
			expect(result.id).toBeDefined();
		});
	});
	describe('Update', () => {
		test('Activate', () => {
			expect(true).toBeTruthy();
		});
		test('Deactivate', () => {
			expect(true).toBeTruthy();
		});
	});
});
