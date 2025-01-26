import { endOfMonth, startOfMonth } from 'date-fns';
import database, { IDatabase } from 'infra/database';
import { DashboardResponse } from 'types/dto/dashboard';

export interface IDashboard {
	collectDashboardData(company_id: number): Promise<DashboardResponse>;
	getCompanyAmountOfActiveClients(company_id): Promise<number>;
	getNotContactedAmount(company_id): Promise<number>;
	getMonthNewClients(company_id: number, date: Date): Promise<number>;
}
export class DashboardRepository implements IDashboard {
	private database: IDatabase;
	constructor(database: IDatabase) {
		this.database = database;
	}
	async collectDashboardData(company_id: number): Promise<DashboardResponse> {
		const active_clients =
			await this.getCompanyAmountOfActiveClients(company_id);
		const this_month_clients = await this.getMonthNewClients(
			company_id,
			new Date()
		);
		const uncontacted_clients = await this.getNotContactedAmount(company_id);
		const result = {
			active_clients,
			this_month_clients,
			uncontacted_clients
		};
		return result;
	}
	async getCompanyAmountOfActiveClients(company_id: number): Promise<number> {
		const query = `select count(*) from clientes c where c."status" = 'ACTIVE' and c.company_id = $1;`;
		const result = await this.database.query({
			text: query,
			values: [company_id]
		});
		return result.rows[0].count;
	}
	async getMonthNewClients(company_id: number, date: Date): Promise<number> {
		const query = `select count(*) from clientes c where company_id = $1 and c.created_at between $2 and $3;`;
		const result = await this.database.query({
			text: query,
			values: [company_id, startOfMonth(date), endOfMonth(date)]
		});
		return result.rows[0].count;
	}
	async getNotContactedAmount(company_id: number): Promise<number> {
		const query = `select count(*) from clientes c where c.has_been_contacted = false and c.company_id = $1;`;
		const result = await this.database.query({
			text: query,
			values: [company_id]
		});
		return result.rows[0].count;
	}
}

const dashboardRepo = new DashboardRepository(database);
export default dashboardRepo;
