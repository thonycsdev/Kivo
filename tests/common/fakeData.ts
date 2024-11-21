import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

const estadosCivil = ['solteiro', 'casado', 'divorciado', 'viuvo'];
function criarClienteFake() {
	const cliente: Prisma.ClienteCreateInput = {
		name: faker.person.fullName(),
		cpf: faker.person.zodiacSign(),
		email: faker.internet.email(),
		phoneNumber: faker.phone.number(),
		address: faker.location.streetAddress(),
		facebook: faker.internet.url(),
		instagram: faker.internet.url(),
		whatsapp: faker.phone.number(),
		personalPhoneNumber: faker.phone.number(),
		jobTitle: faker.person.jobTitle(),
		jobPosition: faker.person.jobTitle(),
		salary: faker.number.float(),
		maritalStatus: estadosCivil[faker.number.int({ min: 0, max: 3 })],
		familyMembersAmount: faker.number.int({ min: 1, max: 10 }),
		description: faker.lorem.paragraph(),
		birthDate: faker.date.past()
	};
	return cliente;
}

export { criarClienteFake };
