import { createFakeClient } from 'tests/common/fakeData';
import UrlManager from '../../../../../utils/urlManager';

describe('Cliente Controller API', () => {
	let urlBuilder: UrlManager;
	beforeEach(() => {
		urlBuilder = UrlManager.create();
		urlBuilder.addPathName('api/v1/cliente');
	});
	test('Should Return 200', async () => {
		const response = await fetch(urlBuilder.getUrlObject());
		expect(response.status).toBe(200);
	});
	test('When POST should return 201', async () => {
		const payload = await createFakeClient();
		const response = await fetch(urlBuilder.getUrlObject(), {
			method: 'POST',
			body: JSON.stringify(payload)
		});
		expect(response.status).toBe(201);
	});
});
