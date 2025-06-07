import { Company } from 'entities/company';

export type CompanyRequest = {
	name: string;
	cnpj: string;
	user_id: string;
};

export type CompanyResponse = {
	id: string;
	name: string;
	cnpj: string;
	created_at: Date;
};

function toResponse(company: Company): CompanyResponse {
	return {
		name: company.getName(),
		cnpj: company.getCNPJ(),
		id: company.getID(),
		created_at: company.getCreationDate()
	};
}

const company_dto = { toResponse };
export default company_dto;
