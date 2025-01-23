import createCompany, { ICreateCompany } from 'data/company/create/create';
import { Company, CompanyInput } from 'types/dto/company';

interface ICompanyModel {
	insertCompany(payload: CompanyInput): Promise<Company>;
}

export class CompanyModel implements ICompanyModel {
	private createCompany: ICreateCompany;
	constructor(createCompany: ICreateCompany) {
		this.createCompany = createCompany;
	}
	async insertCompany(payload: CompanyInput): Promise<Company> {
		if (!payload.name || !payload.user_id) throw 'Precisa de mais dados';
		const result = await this.createCompany.exec(payload);
		return result;
	}
}

const company = new CompanyModel(createCompany);
export default company;
