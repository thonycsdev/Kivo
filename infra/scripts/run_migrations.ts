import database from 'infra/database';
import NodePGMigrate, { RunnerOption } from 'node-pg-migrate';
import path from 'node:path';
async function runMigrations() {
	console.log('Applying Migrations...');
	try {
		const config = await getMigrationConfiguration();
		const migratedMigrations = await NodePGMigrate(config);
		console.log(`Migrations aplicadas: ${migratedMigrations.length}`);
	} catch (error) {
		console.error(`Erro ao aplicar as migrations: ${error}`);
	} finally {
		return;
	}
}

async function getMigrationConfiguration(): Promise<RunnerOption> {
	const dbClient = await database.getNewClient();
	const config: RunnerOption = {
		dbClient,
		dir: path.resolve('infra', 'migrations'),
		direction: 'up',
		verbose: true,
		migrationsTable: 'pgMigrations'
	};
	return config;
}

runMigrations();
