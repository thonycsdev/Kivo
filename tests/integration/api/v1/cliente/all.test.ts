import UrlManager from '../../../../../utils/urlManager';

test('When GET should return array', async () => {
	const urlBuilder = UrlManager.create();
	urlBuilder.addPathName('api/v1/cliente/all');
	const response = await fetch(urlBuilder.href);
	expect(response.status).toBe(200);
	const responseData = await response.json();
	expect(Array.isArray(responseData)).toBe(true);
});
