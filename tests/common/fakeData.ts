import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

const estadosCivil = ['SOLTEIRO', 'CASADO', 'DIVORCIADO', 'VIUVO'];
function criarClienteFake() {
	const cliente: Prisma.ClienteCreateInput = {
		name: faker.person.fullName(),
		cpf: faker.phone.number(),
		email: faker.internet.email(),
		phoneNumber: faker.phone.number(),
		address: faker.location.streetAddress(),
		facebook: faker.internet.url(),
		instagram: faker.internet.url(),
		whatsapp: faker.phone.number(),
		personalPhoneNumber: faker.phone.number(),
		jobTitle: faker.person.jobTitle(),
		jobPosition: faker.person.jobTitle(),
		grossIncome: faker.number.float(),
		netIncome: faker.number.float(),
		maritalStatus: estadosCivil[faker.number.int({ min: 0, max: 3 })],
		familyMembersAmount: faker.number.int({ min: 1, max: 10 }),
		description: faker.lorem.paragraph(),
		birthDate: faker.date.past(),
		hasFinancing: false,
		hasFGTS: true
	};
	return cliente;
}

async function createFakeClient(): Promise<Prisma.ClienteCreateInput> {
	return new Promise((resolve) => {
		resolve(criarClienteFake());
	});
}

function createFakeUserRequest() {
	const user: Prisma.UserCreateInput = {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		password: faker.internet.password()
	};
	return user;
}

export { createFakeClient, createFakeUserRequest };
