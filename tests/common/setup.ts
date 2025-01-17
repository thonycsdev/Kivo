import { Database, DatabasePoolManager } from 'infra/database';
import orchestrator from './orchestrator';
import retry from 'async-retry';
export let testPoolManager: DatabasePoolManager;
export let testDatabase: Database;
beforeAll(async () => {
	testPoolManager = new DatabasePoolManager();
	testDatabase = new Database(testPoolManager);
	const testClient = await testPoolManager.getClientFromPool();
	await orchestrator.waitForAllServices();
	await orchestrator.resetDatabase(testClient);
});

afterAll(async () => {
	retry(testDatabase.closeCurrentPool, {
		retries: 100,
		maxTimeout: 1000,
		onRetry: (e) => console.log(e)
	});
});
