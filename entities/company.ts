import { UUID } from './uuid';

export type CompanyCreate = {
	name: string;
	cnpj: string;
	owner_id: string;
};

export class Company extends UUID {
	private name: string;
	private cnpj: string;
	private readonly owner_id: string;
	private created_at: Date;

	constructor(input: CompanyCreate) {
		super();
		this.validate(input);
		this.name = input.name;
		this.cnpj = input.cnpj;
		this.owner_id = input.owner_id;
		this.created_at = new Date();
	}

	getName() {
		return this.name;
	}
	getOwnerID() {
		return this.owner_id;
	}
	getCNPJ() {
		return this.cnpj;
	}
	getId() {
		return this.id;
	}
	getCreationDate() {
		return this.created_at;
	}

	private validate(input: CompanyCreate) {
		if (!input.name) {
			throw new Error('Company name is required');
		}
		if (!input.cnpj) {
			throw new Error('Company cnpj is required');
		}
		if (!input.owner_id) {
			throw new Error('Company Owner is required');
		}
	}
}

export class CompanyValidator {}
