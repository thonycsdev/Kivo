import { Company } from 'entities/company';
import companyCreate from './create';

export interface ICompanyRepository {
	createCompany(company: Company): Promise<Company>;
}

class CompanyRepository implements ICompanyRepository {
	async createCompany(company: Company): Promise<Company> {
		const new_company = await companyCreate.create(company);
		return new_company;
	}
}

const companyRepository = new CompanyRepository();
export default companyRepository;
