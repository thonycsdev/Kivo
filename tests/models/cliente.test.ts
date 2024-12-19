import { SellingPotential } from '@prisma/client';
import { clienteModel } from 'models/clienteModel';
import { criarClienteFake } from 'tests/common/fakeData';

describe('Cliente Model', () => {
	describe('Update Cliente', () => {
		test('Activate', async () => {
			const cliente = criarClienteFake();
			cliente.status = 'INACTIVE';
			const resultCreate = await clienteModel.criarCliente(cliente);

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
			const cliente = criarClienteFake();
			const resultCreate = await clienteModel.criarCliente(cliente);

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
				const cliente = criarClienteFake();
				cliente.hasFGTS = true;
				const result = await clienteModel.criarCliente(cliente);
				expect(result.sellingPotentialTag).toBe(
					SellingPotential.AltaProbabilidade
				);
			});
		});
		describe('Sem FGTS', () => {
			test('Potencial De Venda', async () => {
				const cliente = criarClienteFake();
				cliente.hasFGTS = false;
				const result = await clienteModel.criarCliente(cliente);
				expect(result.sellingPotentialTag).toBe(SellingPotential.Interessado);
			});
		});
	});
});
