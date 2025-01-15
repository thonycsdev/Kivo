import retry from 'async-retry';
import { ErrorHandler } from '../../utils/errorHandler';
import database from 'infra/database';

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

async function resetDatabase() {
	await database.query({
		text: 'drop schema public cascade; create schema public'
	});
}

const orchestrator = { waitForAllServices, resetDatabase };
export default orchestrator;
