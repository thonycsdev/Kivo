import database from 'infra/database';
import NodePGMigrate, { RunnerOption } from 'node-pg-migrate';
import path from 'node:path';
import { Client } from 'pg';
export async function runMigrations() {
	console.log('Applying Migrations...');
	const client = database.getClient();
	try {
		await client.connect();
		const config = await getMigrationConfiguration(client);
		await NodePGMigrate(config);
	} catch (error) {
		console.error(error);
	} finally {
		await client.end();
		return;
	}
}

async function getMigrationConfiguration(
	dbClient: Client
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
