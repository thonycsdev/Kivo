import database from 'infra/database';
import { ClienteRequest } from 'types/dto/client';

async function createCliente(request: ClienteRequest) {
	const result = await database.query({
		text: `
    INSERT INTO
      clientes
      (name, company_id)
    VALUES 
      ($1, $2)
    RETURNING *
    `,
		values: [request.name, request.company_id]
	});
	return result.rows[0];
}

async function getSingleClienteById(id: string) {
	const result = await database.query({
		text: `
    SELECT * FROM
      clientes c
    WHERE
     c.id = $1 
    `,
		values: [id]
	});
	return result.rows[0];
}

const clientes = {
	createCliente,
	getSingleClienteById
};
export default clientes;
