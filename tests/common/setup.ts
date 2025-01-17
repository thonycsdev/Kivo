import { Database, DatabasePoolManager } from 'infra/database';
import orchestrator from './orchestrator';
export const testPoolManager = new DatabasePoolManager();
export const testDatabase = new Database(testPoolManager);
beforeAll(async () => {
	const testClient = await testPoolManager.getClientFromPool();
	await orchestrator.waitForAllServices();
	await orchestrator.resetDatabase(testClient);
});

afterAll(async () => {
	await testDatabase.closeCurrentPool();
});
