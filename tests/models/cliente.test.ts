import { Prisma, SellingPotential } from '@prisma/client';
import { clienteModel } from 'models/client';
import { createFakeClient } from 'tests/common/fakeData';
let fakeClient = {} as Prisma.ClienteCreateInput;
beforeEach(async () => {
	fakeClient = await createFakeClient();
});
describe('Cliente Model', () => {
	describe('Update Cliente', () => {
		test('Activate', async () => {
			fakeClient.status = 'INACTIVE';
			const resultCreate = await clienteModel.criarCliente(fakeClient);

			const resultUpdate = await fetch(
				`http://localhost:3000/api/v1/cliente/status/activate`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						clienteId: resultCreate.id
					})
				}
			);

			expect(resultUpdate.status).toBe(200);

			const result = await resultUpdate.json();
			expect(result.id).toBe(resultCreate.id);
			expect(result.status).toBe('ACTIVE');
		});
		test('Deactivate', async () => {
			const resultCreate = await clienteModel.criarCliente(fakeClient);

			const resultUpdate = await fetch(
				`http://localhost:3000/api/v1/cliente/status/deactivate`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						clienteId: resultCreate.id
					})
				}
			);

			expect(resultUpdate.status).toBe(200);

			const result = await resultUpdate.json();
			expect(result.id).toBe(resultCreate.id);
			expect(result.status).toBe('INACTIVE');
		});
	});

	describe('Insert', () => {
		describe('Com FGTS', () => {
			test('Potencial De Venda', async () => {
				fakeClient.hasFGTS = true;
				const result = await clienteModel.criarCliente(fakeClient);
				expect(result.sellingPotentialTag).toBe(
					SellingPotential.AltaProbabilidade
				);
			});
		});
		describe('Sem FGTS', () => {
			test('Potencial De Venda', async () => {
				fakeClient.hasFGTS = false;
				const result = await clienteModel.criarCliente(fakeClient);
				expect(result.sellingPotentialTag).toBe(SellingPotential.Interessado);
			});
		});
	});
});
