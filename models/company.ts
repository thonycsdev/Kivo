import database from 'infra/database';
import { CompanyRequest } from 'types/dto/company';

async function createCompany(companyRequest: CompanyRequest) {
	const result = await database.query({
		text: `
    INSERT INTO
      companies
      (name, cnpj)
    VALUES
      ($1, $2)
    RETURNING *;

    `,
		values: [companyRequest.name, companyRequest.cnpj]
	});
	return result.rows[0];
}

const company = {
	createCompany
};

export default company;
