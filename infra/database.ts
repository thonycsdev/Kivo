import { ClientConfig, Pool, PoolClient, QueryConfig, QueryResult } from 'pg';
export interface IDatabase {
	query(queryObject: QueryConfig): Promise<QueryResult>;
	getNewClient(): Promise<PoolClient>;
}
const config: ClientConfig = {
	host: process.env.POSTGRES_HOST,
	port: +process.env.POSTGRES_PORT,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	ssl: getSSLValues()
};

export class DatabasePoolManager {
	private pool: Pool;
	constructor() {
		this.pool = new Pool(config);
		console.log('Pool Open');
	}

	async getClientFromPool() {
		return await this.pool.connect();
	}

	async closePool() {
		await this.pool.end();
		console.log('Pool Closed');
	}
}

export class Database implements IDatabase {
	private poolManager: DatabasePoolManager;
	constructor(poolManager: DatabasePoolManager) {
		this.poolManager = poolManager;
	}
	async query(queryObject: QueryConfig) {
		const client = await this.poolManager.getClientFromPool();
		try {
			const result = await client.query(queryObject);
			return result;
		} catch (error) {
			console.error(error);
		} finally {
			client.release();
		}
	}
	async getNewClient(): Promise<PoolClient> {
		return await this.poolManager.getClientFromPool();
	}

	async closeCurrentPool() {
		await poolManager.closePool();
		console.log('Pool Closed');
	}
}

function getSSLValues() {
	return process.env.NODE_ENV == 'production';
}
const poolManager = new DatabasePoolManager();
const database = new Database(poolManager);
export default Object.freeze(database);
