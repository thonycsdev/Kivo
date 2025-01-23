import { IDatabase } from '../infra/database';
import selling_potential from './selling_potential';
import format_string from 'utils/format_string';
import { AllClientsRequest } from 'app/api/v1/cliente/all/route';
import { Client, ClientRequest } from 'types/dto/client';
import { createInsertQuery } from 'data/queries/client_queries';
import database from '../infra/database';

export class ClienteModel {
	private database: IDatabase;
	constructor(database: IDatabase) {
		this.database = database;
	}
	async criarCliente(cliente: ClientRequest): Promise<Client> {
		if (!cliente) {
			throw new Error('O argumento do metodo "criarCliente" deve ser valido');
		}

		cliente.email = format_string.emailFormatting(cliente.email);

		selling_potential.addSellingPotential(cliente);

		const keys = Object.keys(cliente);
		const fieldValues = keys.map((k) => cliente[k]);

		const result = await this.database.query({
			text: createInsertQuery(cliente),
			values: fieldValues
		});

		return result.rows[0];
	}

	async buscarClientePorId(id: number) {
		const result = await this.database.query({
			text: 'select * from clientes where id = $1',
			values: [id]
		});
		return result.rows[0];
	}

	async buscarTodosClientes({
		company_id,
		pagination
	}: AllClientsRequest): Promise<{ clientes: Client[]; total: number }> {
		const skipAmount = pagination.page * pagination.rowsPerPage;
		const takeAmount = pagination.rowsPerPage;
		const result = await this.database.query({
			text: 'select * from clientes c where c.company_id = $1 order by c.id OFFSET $2 ROWS FETCH NEXT $3 ROWS ONLY;',
			values: [company_id, skipAmount, takeAmount]
		});

		return { clientes: result.rows, total: result.rowCount };
	}

	async getClienteByName(name: string): Promise<Client> {
		const query = 'select * from clientes c where c.name like $1';
		const result = await this.database.query({
			text: query,
			values: [name]
		});
		return result.rows[0];
	}

	async getAllActiveClientsThatHaventBeenContacted() {
		throw new Error();
	}

	async deactivate(clienteId: number) {
		throw new Error(clienteId.toString());
	}

	async activate(clienteId: number) {
		throw new Error(clienteId.toString());
	}
}

export const clienteModel = new ClienteModel(database);
