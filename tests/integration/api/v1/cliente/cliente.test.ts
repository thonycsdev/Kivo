import { criarClienteFake } from '../../../../common/fakeData';

describe('Cliente Controller API', () => {
	test('Should Return 200', async () => {
		const response = await fetch('http://localhost:3000/api/v1/cliente');
		expect(response.status).toBe(200);
	});
	test('When POST should return 201', async () => {
		const payload = criarClienteFake();
		const response = await fetch('http://localhost:3000/api/v1/cliente', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
		expect(response.status).toBe(201);
	});
});
