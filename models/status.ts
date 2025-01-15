import { ResponseData } from '../app/api/v1/status/route';
import database from '../infra/database';

export class StatusModel {
	constructor() {}
	async buildStatusResponse(): Promise<ResponseData> {
		const database = await this.buildDatabaseStatus();
		const response: ResponseData = {
			created_at: new Date(),
			message: 'SERVER_OK',
			database
		};
		console.log(response);
		return response;
	}

	async buildDatabaseStatus() {
		const versionResult = await database.query({ text: 'SELECT version();' });

		const maxConnectionsResult = await database.query({
			text: 'SHOW max_connections;'
		});
		const databaseName = process.env.POSTGRES_DB;
		const activeConnectionsResult = await database.query({
			text: 'SELECT COUNT(*)::int FROM pg_stat_activity psa where psa.datname=$1',
			values: [databaseName]
		});

		const status = {
			version: getOnlyDatabaseNameVersion(versionResult.rows[0].version),
			max_connections: +maxConnectionsResult.rows[0].max_connections,
			active_connections: activeConnectionsResult.rows[0].count
		};
		return status;
	}
}
export function getOnlyDatabaseNameVersion(value: string): string {
	const result = value.split(' ').splice(0, 2).join(' ');
	return result;
}

const statusModel = new StatusModel();
export default statusModel;
