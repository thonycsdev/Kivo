import database, { IDatabase } from 'infra/database';
import { Company } from 'types/dto/company';

export interface IGetUserCompanies {
	exec(userId: number): Promise<Company[]>;
}

export class GetUserCompanies implements IGetUserCompanies {
	private database: IDatabase;
	constructor(database: IDatabase) {
		this.database = database;
	}
	exec(userId: number): Promise<Company[]> {
		throw new Error('Method not implemented.');
	}
}

const getUserCompanies = new GetUserCompanies(database);
export default getUserCompanies;
