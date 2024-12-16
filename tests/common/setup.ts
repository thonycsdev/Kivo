import prisma from '../../infra/database';
import orchestrator from './orchestrator';
beforeAll(async () => {
	await orchestrator.waitForAllServices();
});

afterAll(async () => {
	// const deleteclientes = prisma.cliente.deleteMany();
	const deleteUsers = prisma.user.deleteMany();
	await prisma.$transaction([deleteUsers]);
});
