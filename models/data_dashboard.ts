import { endOfMonth, startOfMonth } from 'date-fns';
import prisma from 'infra/database';

async function buildDashboardData() {
	const active_clients = await getTotalAmountOfActiveClients();
	const this_month_clients = await getTotalOfNewClientsInCurrentMonth();
	const uncontacted_clients = await getTotalOfUncontatedClients();
	return { active_clients, this_month_clients, uncontacted_clients };
}

async function getTotalAmountOfActiveClients() {
	const clients = await prisma.cliente.count({
		where: {
			status: 'ACTIVE'
		}
	});

	return clients;
}

async function getTotalOfNewClientsInCurrentMonth() {
	const startDate = startOfMonth(new Date());
	const endDate = endOfMonth(new Date());
	const clients = await prisma.cliente.count({
		where: {
			createdAt: {
				gte: startDate,
				lte: endDate
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return clients;
}

async function getTotalOfUncontatedClients() {
	const clients = await prisma.cliente.count({
		where: {
			hasBeenContacted: false
		}
	});
	return clients;
}

export default Object.freeze({ buildDashboardData });
