import { Cliente, Prisma } from '@prisma/client';

export default interface IClient {
	addClient(client: Prisma.ClienteCreateInput): Promise<Cliente>;
}
