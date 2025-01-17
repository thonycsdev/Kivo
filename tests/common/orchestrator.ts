import retry from 'async-retry';
import { ErrorHandler } from '../../utils/errorHandler';
import { runMigrations } from 'infra/scripts/run_migrations';
import { PoolClient } from 'pg';

async function waitForAllServices() {
	await waitForWebServer();
}

async function waitForWebServer() {
	return retry(fetchStatusEndpoint, {
		retries: 100,
		maxTimeout: 10000,
		onRetry: retryLogMessage
	});
}

async function fetchStatusEndpoint() {
	const response = await fetch('http://localhost:3000/api/v1/status');
	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.message);
	}
}

async function retryLogMessage(err: Error, attempt: number) {
	const error = ErrorHandler.create(err);
	error.name = `Fail to fetch status endpoint, attempt: ${attempt}`;
	error.addSolution('Check the status endpoint');
	error.log();
}

async function resetDatabase(poolClient: PoolClient) {
	await poolClient.query({
		text: 'drop schema public cascade; create schema public'
	});

	await runMigrations(poolClient);
}

const orchestrator = { waitForAllServices, resetDatabase };
export default orchestrator;
