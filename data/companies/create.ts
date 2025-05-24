import database from 'infra/database';
import { CompanyRequest } from 'types/dto/company';

class Create {
	constructor() {}
	async create(companyRequest: CompanyRequest) {
		const result = await database.query({
			text: `
    INSERT INTO
      companies
      (name, cnpj, user_id)
    VALUES
      ($1, $2, $3)
    RETURNING *;

    `,
			values: [companyRequest.name, companyRequest.cnpj, companyRequest.user_id]
		});
		return result.rows[0];
	}
}

const companyCreate = new Create();
export default companyCreate;
