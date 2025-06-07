import companyRepository, {
	ICompanyRepository
} from 'data/companies/repository';
import { Company } from 'entities/company';
import company_dto, {
	CompanyRequest,
	CompanyResponse
} from 'types/dto/company';

export interface ICompanyModel {
	createCompany(companyModel: CompanyRequest): Promise<CompanyResponse>;
}

class CompanyModel implements ICompanyModel {
	constructor(private readonly companyRepository: ICompanyRepository) {
		this.companyRepository = companyRepository;
	}
	async createCompany(companyModel: CompanyRequest): Promise<CompanyResponse> {
		const company = new Company({
			cnpj: companyModel.cnpj,
			owner_id: companyModel.user_id,
			name: companyModel.name
		});

		await this.companyRepository.createCompany(company);
		return company_dto.toResponse(company);
	}
}

const companyModel = new CompanyModel(companyRepository);
export default companyModel;
