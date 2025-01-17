import { ClientRequest } from 'types/dto/client';
function camelToSnakeCase(camel: string): string {
	if (camel == 'hasFGTS') return 'has_FGTS';
	return camel.replace(/([A-Z])/g, '_$1').toLowerCase();
}
export function createInsertQuery(data: ClientRequest): string {
	const columns = Object.keys(data).map(camelToSnakeCase); // Pega os nomes das colunas
	const placeholders = columns.map((_, index) => `$${index + 1}`); // Gera $1, $2, $3...

	const query = `
      INSERT INTO clientes (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *;
    `;
	return query;
}
