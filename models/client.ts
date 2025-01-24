import selling_potential from './selling_potential';
import {
	Client,
	ClientePaginationRequest,
	ClienteWithTotalAmountResponse,
	ClientRequest
} from 'types/dto/client';
import clientRepo, { IClienteRepository } from 'data/cliente/repository';

export class ClienteModel {
	private clienteRepo: IClienteRepository;
	constructor(clienteRepo: IClienteRepository) {
		this.clienteRepo = clienteRepo;
	}
	async createCliente(cliente: ClientRequest): Promise<Client> {
		if (!cliente) throw new Error('Invalid Request');

		selling_potential.addSellingPotential(cliente);

		const result = this.clienteRepo.createCliente(cliente);
		return result;
	}

	async getClienteById(id: number, company_id: number) {
		if (!id || !company_id) throw new Error('Id Or Company Id Invalid');

		const result = this.clienteRepo.getClienteByIdFromACompanyId(
			id,
			company_id
		);

		return result;
	}

	async buscarTodosClientes(
		request: ClientePaginationRequest
	): Promise<ClienteWithTotalAmountResponse> {
		const result = await this.clienteRepo.getAllClientsFromACompanyId(request);
		return result;
	}

	async getClienteByName(name: string): Promise<Client> {
		const result = await this.getClienteByName(name);
		return result;
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

export const clienteModel = new ClienteModel(clientRepo);
