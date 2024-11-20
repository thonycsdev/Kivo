import { getOnlyDatabaseNameVersion } from '../../models/statusModel';

describe('Status Model Tests', () => {
	test('Deveria retornar somente o nome PostgreSQL 13.4 como versao do postgres sendo uma string', () => {
		const versionResult = [
			{
				version:
					'PostgreSQL 13.4 on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 9.3.0-17ubuntu1~20.04) 9.3.0, 64-bit'
			}
		];
		const result = getOnlyDatabaseNameVersion(versionResult[0].version);
		expect(result).toBe('PostgreSQL 13.4');
	});
});
