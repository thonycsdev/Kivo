import { Company, CompanyRequest } from 'types/dto/company';
import companyCreate from './create';

export interface ICompanyRepository {
	createCompany(company_request: CompanyRequest): Promise<Company>;
}

class CompanyRepository implements ICompanyRepository {
	async createCompany(company_request: CompanyRequest): Promise<Company> {
		const new_company = await companyCreate.create(company_request);
		return new_company;
	}
}

const companyRepository = new CompanyRepository();
export default companyRepository;
