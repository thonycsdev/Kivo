import { IDatabase } from '../infra/database';
import { ErrorHandler } from 'utils/errorHandler';
import selling_potential from './selling_potential';
import format_string from 'utils/format_string';
import { AllClientsRequest } from 'app/api/v1/cliente/all/route';
import { Client, ClientRequest } from 'types/dto/client';
import { createInsertQuery } from 'data/queries/client_queries';
import database from '../infra/database';

export class ClienteModel {
	private database: IDatabase;
	constructor(database: IDatabase) {
		console.log('Created');
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
		console.log({ company_id });
		const result = await this.database.query({
			text: 'select * from clientes c order by c.id OFFSET $2 ROWS FETCH NEXT $3 ROWS ONLY where c.company_id = $1 ;',
			values: [company_id, skipAmount, takeAmount]
		});

		return { clientes: result.rows, total: result.rowCount };
	}

	async getAllActiveClientsThatHaventBeenContacted() {
		const clients = await this.prismaClient.cliente.findMany({
			where: {
				status: 'ACTIVE',
				hasBeenContacted: false
			}
		});

		return clients;
	}

	async deactivate(clienteId: number) {
		const cliente = await this.buscarClientePorId(clienteId);
		if (!cliente) {
			const erro = ErrorHandler.create(
				new Error('Cliente nao encontrado'),
				404
			);
			throw erro;
		}

		try {
			const result = await this.prismaClient.cliente.update({
				where: {
					id: clienteId
				},
				data: {
					status: 'INACTIVE'
				}
			});
			return result;
		} catch (error) {
			const erroHandler = ErrorHandler.create(error, 500);
			throw erroHandler;
		}
	}

	async activate(clienteId: number) {
		const cliente = await this.buscarClientePorId(clienteId);
		if (!cliente) {
			const erro = ErrorHandler.create(
				new Error('Cliente nao encontrado'),
				404
			);
			throw erro;
		}

		try {
			const result = await this.prismaClient.cliente.update({
				where: {
					id: clienteId
				},
				data: {
					status: 'ACTIVE'
				}
			});
			return result;
		} catch (error) {
			const erroHandler = ErrorHandler.create(error, 500);
			throw erroHandler;
		}
	}
}

export const clienteModel = new ClienteModel(database);
