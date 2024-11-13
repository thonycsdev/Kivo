describe('/Status API', () => {
	test('Should Return 200', async () => {
		const response = await fetch('http://localhost:3000/api/v1/status');
		expect(response.status).toBe(200);
	});

	test('Response data', async () => {
		const response = await fetch('http://localhost:3000/api/v1/status');
		const responseData = await response.json();
		expect(responseData.created_at).toBeDefined();
		expect(responseData.message).toBe('SERVER_OK');
	});
});
