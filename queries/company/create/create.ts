import database from 'infra/database';
import { Client } from 'pg';
import createRole, { ICreateRole } from 'queries/role/create/create';
import { Company } from 'types/dto/company';
import { Role } from 'types/dto/role';
import { User } from 'types/dto/user';

export class CreateCompany {
	private client: Client;
	private createRole: ICreateRole;
	constructor(client: Client, createRole: ICreateRole) {
		this.client = client;
		this.createRole = createRole;
	}

	async create(userId: number, input: string): Promise<Company> {
		try {
			await this.client.connect();
			await this.client.query({ text: 'BEGIN' });
			const result = await this.client.query({
				text: 'insert into companies (name) values ($1) returning *',
				values: [input]
			});
			const companyResult = { ...result.rows[0] } as Company;
			const role = await this.createRole.createDefaultRole();
			await this.createCompanyRolesRow(companyResult.id, role.id);
			await this.createUserCompanyRow(userId, companyResult.id);

			await this.client.query({
				text: 'COMMIT'
			});

			companyResult.roles = await this.getCompanyRoles(companyResult.id);
			companyResult.user = await this.getOwner(userId);

			return companyResult;
		} catch (error) {
			console.error(error);
			await this.client.query({
				text: 'ROLLBACK'
			});
		} finally {
			await this.client.end();
		}
	}

	async createCompanyRolesRow(
		companyId: number,
		roleId: number
	): Promise<void> {
		await this.client.query({
			text: 'insert into company_role(company_id, role_id) values ($1, $2)',
			values: [companyId, roleId]
		});
	}
	async createUserCompanyRow(userId: number, companyId: number): Promise<void> {
		await this.client.query({
			text: 'insert into user_company(user_id, company_id) values ($1, $2)',
			values: [userId, companyId]
		});
	}

	async getCompanyRoles(companyId: number): Promise<Role[]> {
		const rolesFromCompany = await this.client.query({
			text: 'SELECT r.id, r.name FROM roles r INNER JOIN company_role cr ON cr.role_id = r.id INNER JOIN companies c ON c.id = cr.company_id WHERE c.id = $1;',
			values: [companyId]
		});

		return rolesFromCompany.rows as Role[];
	}

	async getOwner(userId: number): Promise<User> {
		const owner = await this.client.query({
			text: 'SELECT u.* FROM users u INNER JOIN user_company uc ON uc.user_id = u.id INNER JOIN companies c ON uc.company_id = c.id WHERE u.id = $1;',
			values: [userId]
		});
		return owner.rows[0];
	}
}
const client = database.getClosedClient();
const createCompany = new CreateCompany(client, createRole);
export default createCompany;
