import prisma from '../../infra/database';
import orchestrator from './orchestrator';
beforeAll(async () => {
	await orchestrator.waitForAllServices();
});

afterAll(async () => {
	orchestrator.resetDatabase();
});
