import prisma from '../../infra/database';
import orchestrator from './orchestrator';
beforeAll(async () => {
	await orchestrator.waitForAllServices();
});

afterAll(async () => {
	const clients = prisma.cliente.deleteMany();
	const companies = prisma.company.deleteMany();
	const userCompany = prisma.userCompany.deleteMany();
	const userRoles = prisma.userRole.deleteMany();
	const users = prisma.user.deleteMany();
	const companyRoles = prisma.companyRole.deleteMany();
	await prisma.$transaction([
		userCompany,
		companyRoles,
		userRoles,
		users,
		clients,
		companies
	]);
});
