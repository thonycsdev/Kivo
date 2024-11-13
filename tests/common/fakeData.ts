import { faker } from '@faker-js/faker';
import { Cliente } from '@prisma/client';

const estadosCivil = ['solteiro', 'casado', 'divorciado', 'viuvo'];
function criarClienteFake() {
	const cliente: Cliente = {
		id: faker.number.int({ min: 1, max: 1_000_000 }),
		nome: faker.person.fullName(),
		email: faker.internet.email(),
		telefone: faker.phone.number(),
		criadoEm: faker.date.past(),
		atualizadoEm: faker.date.recent(),
		enderecoFisico: faker.location.streetAddress(),
		facebook: faker.internet.url(),
		instagram: faker.internet.url(),
		whatsapp: faker.phone.number(),
		numeroPessoal: faker.phone.number(),
		profissao: faker.person.jobTitle(),
		cargo: faker.person.jobTitle(),
		salario: faker.number.float(),
		estadoCivil: estadosCivil[faker.number.int({ min: 0, max: 3 })],
		membrosFamilia: faker.number.int({ min: 1, max: 10 }),
		descricao: faker.lorem.paragraph(),
		dataNascimento: faker.date.past()
	};
	return cliente;
}

export { criarClienteFake };
