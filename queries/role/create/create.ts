import database from 'infra/database';
import InterfaceDatabase from 'intefaces/interface_database';
import { Role } from 'types/dto/role';
export interface ICreateRole {
	createDefaultRole(): Promise<Role>;
}
export class CreateRole implements ICreateRole {
	private database: InterfaceDatabase;
	constructor(database: InterfaceDatabase) {
		this.database = database;
	}
	async createDefaultRole() {
		const role = await this.database.query({
			text: 'insert into roles (name) values ($1) returning *',
			values: ['ADMIN']
		});
		return role.rows[0] as Role;
	}
}

const createRole = new CreateRole(database);
export default createRole;
