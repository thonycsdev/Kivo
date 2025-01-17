import { faker } from '@faker-js/faker';
import { ClientRequest } from 'types/dto/client';

const estadosCivil = ['SOLTEIRO', 'CASADO', 'DIVORCIADO', 'VIUVO'];
function criarClienteFake() {
	const cliente: ClientRequest = {
		name: faker.person.fullName(),
		cpf: faker.string.alphanumeric(14),
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
		hasFGTS: isEven(faker.number.int({ min: 0, max: 10 })),
		preferredMeansOfCommunication: 'Whatsapp',
		hasBeenContacted: false,
		status: 'ACTIVE'
	};
	return cliente;
}

function isEven(num: number) {
	if (num % 2 === 0) {
		return true;
	}
	return false;
}

async function createFakeClient(): Promise<ClientRequest> {
	return new Promise((resolve) => {
		resolve(criarClienteFake());
	});
}

export { createFakeClient };
