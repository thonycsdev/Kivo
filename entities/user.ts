import { UUID } from './uuid';

export type UserCreate = {
	name: string;
};
export class User extends UUID {
	private readonly name: string;
	private companies: string[];
	constructor(input: UserCreate) {
		super();
		this.name = input.name;
		this.companies = [];
	}
	getName() {
		return this.name;
	}
	addCompany(company_id: string) {
		this.companies.push(company_id);
		return this.getCompanies();
	}
	getCompanies() {
		return this.companies;
	}
}
