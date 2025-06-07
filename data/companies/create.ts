import { Company } from 'entities/company';
import database from 'infra/database';

class Create {
	constructor() {}
	async create(company: Company) {
		const result = await database.query({
			text: `
    INSERT INTO
      companies
      (name, cnpj, user_id)
    VALUES
      ($1, $2, $3)
    RETURNING *;

    `,
			values: [company.getName(), company.getCNPJ(), company.getOwnerID()]
		});
		return result.rows[0];
	}
}

const companyCreate = new Create();
export default companyCreate;
