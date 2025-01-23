import { DatabasePoolManager } from 'infra/database';
import NodePGMigrate, { RunnerOption } from 'node-pg-migrate';
import path from 'node:path';
import { PoolClient } from 'pg';
export async function runMigrations(poolClient?: PoolClient) {
	console.log('Applying Migrations...');
	if (!poolClient) {
		const pm = new DatabasePoolManager();
		poolClient = await pm.getClientFromPool();
	}
	try {
		const config = await getMigrationConfiguration(poolClient);
		await NodePGMigrate(config);
	} catch (error) {
		console.error(error);
	} finally {
		poolClient.release();
		return;
	}
}

async function getMigrationConfiguration(
	dbClient: PoolClient
): Promise<RunnerOption> {
	const config: RunnerOption = {
		dbClient,
		dir: path.resolve('infra', 'migrations'),
		direction: 'up',
		verbose: true,
		log: (message) => {
			if (!message.includes('VERBOSE')) {
				return;
			}
		},
		dryRun: false,
		migrationsTable: 'pgMigrations'
	};
	return config;
}

if (process.env && process.env.NODE_ENV !== 'test') {
	runMigrations();
}
