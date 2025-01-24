import { DashboardResponse } from 'types/dto/dashboard';

describe('Dashboard Endpoint', () => {
	test('Get', async () => {
		const urlRequest = `http://localhost:3000/api/v1/cliente/dashboard?company_id=1`;
		const response = await fetch(urlRequest);
		const responseBody = (await response.json()) as DashboardResponse;
		console.log(responseBody);
		expect(responseBody.active_clients).toBeDefined();
		expect(responseBody.this_month_clients).toBeDefined();
		expect(responseBody.uncontacted_clients).toBeDefined();
	});
});
