import query from 'data/queries/query';
import { IDatabase } from 'infra/database';
import { Role } from 'types/dto/role';
import { User } from 'types/dto/user';

interface IUserGet {
	getUserById(userId: number): Promise<User>;
	getUserRolesAtCompany(userId: number, companyId: number): Promise<Role[]>;
}

export class UserGet implements IUserGet {
	private database: IDatabase;
	constructor(database: IDatabase) {
		this.database = database;
	}

	async getUserById(userId: number): Promise<User> {
		const result = await this.database.query({
			text: query.user.getUserById,
			values: [userId]
		});
		return result.rows[0];
	}

	async getUserRolesAtCompany(
		userId: number,
		companyId: number
	): Promise<Role[]> {
		const result = await this.database.query({
			text: query.user.getUserRolesFromACompany,
			values: [userId, companyId]
		});
		return result.rows;
	}
}
