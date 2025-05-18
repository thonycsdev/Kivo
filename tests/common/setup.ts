import orchestrator from './orchestrator';
beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.resetDatabase();
});
