import companyRepo, { ICompanyRepository } from 'data/company/repository';
import { Company, CompanyInput } from 'types/dto/company';

export class CompanyModel {
	private companyRepo: ICompanyRepository;
	constructor(companyRepo: ICompanyRepository) {
		this.companyRepo = companyRepo;
	}
	async insertCompany(payload: CompanyInput): Promise<Company> {
		if (!payload.name || !payload.user_id)
			throw new Error('Invalid Input Request');
		const result = await this.companyRepo.createCompany(payload);
		return result;
	}
}

const company = new CompanyModel(companyRepo);
export default company;
