import prisma from '../../infra/database';
import orchestrator from './orchestrator';

afterEach(async () => {
	await prisma.$disconnect();
});

beforeEach(async () => {
	await prisma.$connect();
});
beforeAll(async () => {
	await orchestrator.waitForAllServices();
});

afterAll(async () => {
	const deletecliente = prisma.cliente.deleteMany();
	await prisma.$transaction([deletecliente]);
});
