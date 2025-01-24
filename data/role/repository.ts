import database, { IDatabase } from 'infra/database';
import { Role } from 'types/dto/role';

export interface IRoleRepository {
	createDefaultRole(): Promise<Role>;
	giveUserDefaultRole(userId: number, roleId: number): Promise<void>;
}
export class RoleRepository implements IRoleRepository {
	private database: IDatabase;
	constructor(database: IDatabase) {
		this.database = database;
	}
	async giveUserDefaultRole(userId: number, roleId: number): Promise<void> {
		await this.database.query({
			text: 'insert into user_role (user_id, role_id) values ($1, $2)',
			values: [userId, roleId]
		});
	}
	async createDefaultRole() {
		const role = await this.database.query({
			text: 'insert into roles (name) values ($1) returning *',
			values: ['ADMIN']
		});
		return role.rows[0] as Role;
	}
}

const roleRepo = new RoleRepository(database);
export default roleRepo;
