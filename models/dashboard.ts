import dashboardRepo, { IDashboard } from 'data/dashboard/repository';
import { DashboardResponse } from 'types/dto/dashboard';

export class DashboardModel {
	private dashboardRepo: IDashboard;
	constructor(dashboardRepo: IDashboard) {
		this.dashboardRepo = dashboardRepo;
	}

	async getData(company_id: number): Promise<DashboardResponse> {
		const result = await this.dashboardRepo.collectDashboardData(company_id);
		return result;
	}
}

const dashboardModel = new DashboardModel(dashboardRepo);
export default dashboardModel;
