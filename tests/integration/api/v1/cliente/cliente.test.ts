import UrlManager from '../../../../../utils/urlManager';
import { criarClienteFake } from '../../../../common/fakeData';

describe('Cliente Controller API', () => {
	let urlBuilder: UrlManager;
	beforeEach(() => {
		urlBuilder = UrlManager.create();
		urlBuilder.addPathName('api/v1/cliente');
	});
	test('Should Return 200', async () => {
		const response = await fetch(urlBuilder.href);
		expect(response.status).toBe(200);
	});
	test('When POST should return 201', async () => {
		const payload = criarClienteFake();
		const response = await fetch(urlBuilder.href, {
			method: 'POST',
			body: JSON.stringify(payload)
		});
		expect(response.status).toBe(201);
	});
});
