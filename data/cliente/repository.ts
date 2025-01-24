import { createInsertQuery } from 'data/queries/client_queries';
import database, { IDatabase } from 'infra/database';
import {
	Client,
	ClientePaginationRequest,
	ClienteWithTotalAmountResponse,
	ClientRequest
} from 'types/dto/client';

export interface IClienteRepository {
	createCliente(input: ClientRequest): Promise<Client>;
	getClienteByIdFromACompanyId(
		cliente_id: number,
		company_id: number
	): Promise<Client>;
	getAllClientsFromACompanyId(
		input: ClientePaginationRequest
	): Promise<ClienteWithTotalAmountResponse>;
	getAllActiveClientsThatHaventBeenContacted(
		company_id: number
	): Promise<Client>;
	activateCliente(cliente_id: number): Promise<void>;
	deactivateCliente(cliente_id: number): Promise<void>;
	getClienteByName(cliente_name, company_id: number): Promise<Client>;
}
export class ClienteRepository implements IClienteRepository {
	private database: IDatabase;
	constructor(database: IDatabase) {
		this.database = database;
	}

	async createCliente(cliente: ClientRequest): Promise<Client> {
		if (!cliente) {
			throw new Error('O argumento do metodo "criarCliente" deve ser valido');
		}
		const keys = Object.keys(cliente);
		const fieldValues = keys.map((k) => cliente[k]);

		const result = await this.database.query({
			text: createInsertQuery(cliente),
			values: fieldValues
		});

		return result.rows[0];
	}
	async getClienteByIdFromACompanyId(
		cliente_id: number,
		company_id: number
	): Promise<Client> {
		const result = await this.database.query({
			text: 'select * from clientes where id = $1 and company_id = $2;',
			values: [cliente_id, company_id]
		});
		return result.rows[0];
	}
	async getAllClientsFromACompanyId({
		pagination,
		company_id
	}: ClientePaginationRequest): Promise<ClienteWithTotalAmountResponse> {
		const skipAmount = pagination.page * pagination.rowsPerPage;
		const takeAmount = pagination.rowsPerPage;
		const result = await this.database.query({
			text: 'select * from clientes c where c.company_id = $1 order by c.id OFFSET $2 ROWS FETCH NEXT $3 ROWS ONLY;',
			values: [company_id, skipAmount, takeAmount]
		});

		return { clientes: result.rows, total: result.rowCount };
	}
	async getClienteByName(
		cliente_name: number,
		company_id: number
	): Promise<Client> {
		const query =
			'select * from clientes c where c.company_id = $2 and c.name like $1 ';
		const result = await this.database.query({
			text: query,
			values: [cliente_name, company_id]
		});
		return result.rows[0];
	}

	getAllActiveClientsThatHaventBeenContacted(
		company_id: number
	): Promise<Client> {
		console.log(company_id);
		throw new Error('Method not implemented.');
	}
	activateCliente(cliente_id: number): Promise<void> {
		console.log(cliente_id);
		throw new Error('Method not implemented.');
	}
	deactivateCliente(cliente_id: number): Promise<void> {
		console.log(cliente_id);
		throw new Error('Method not implemented.');
	}
}

const clientRepo = new ClienteRepository(database);
export default clientRepo;
