import retry from 'async-retry';

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
		throw new Error(`Failed to fetch status endpoint ${response.statusText}`);
	}
}

async function retryLogMessage(err: Error, attempt: number) {
	console.log(`Attempt ${attempt} failed: ${err.name}, retrying...`);
}

const orchestrator = { waitForAllServices };
export default orchestrator;
