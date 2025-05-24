import companyRepository, {
	ICompanyRepository
} from 'data/companies/repository';
import database from 'infra/database';
import { Company, CompanyRequest } from 'types/dto/company';

export interface ICompanyModel {
	createCompany(companyModel: CompanyRequest): Promise<Company>;
}

class CompanyModel implements ICompanyModel {
	constructor(private readonly companyRepository: ICompanyRepository) {
		this.companyRepository = companyRepository;
	}
	async createCompany(companyModel: CompanyRequest): Promise<Company> {
		const company = await this.companyRepository.createCompany(companyModel);
		return company;
	}
}

const companyModel = new CompanyModel(companyRepository);
export default companyModel;

async function findManyCompaniesByUserId(user_id: string) {
	const result = await database.query({
		text: `
    SELECT * FROM
      companies c
    WHERE c.user_id = $1
    `,
		values: [user_id]
	});
	return result.rows;
}
