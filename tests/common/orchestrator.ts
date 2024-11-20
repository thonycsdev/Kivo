import retry from 'async-retry';
import { ErrorHandler } from '../../utils/errorHandler';

async function waitForAllServices() {
	await waitForWebServer();
}

async function waitForWebServer() {
	return retry(fetchStatusEndpoint, {
		retries: 100,
		maxTimeout: 1000,
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

const orchestrator = { waitForAllServices };
export default orchestrator;
