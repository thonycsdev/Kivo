test('When GET should return array', async () => {
	const url = new URL('http://localhost:3000/api/v1/cliente');
	url.pathname += '/all';
	const response = await fetch(url);
	expect(response.status).toBe(200);
	const responseData = await response.json();
	expect(Array.isArray(responseData)).toBe(true);
});
