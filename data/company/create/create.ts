import database, { IDatabase } from 'infra/database';
import createRole, { ICreateRole } from 'data/role/create/create';
import { Company, CompanyInput } from 'types/dto/company';
import { Role } from 'types/dto/role';
import { User } from 'types/dto/user';

export interface ICreateCompany {
	exec(payload: CompanyInput): Promise<Company>;
}
export class CreateCompany implements ICreateCompany {
	private database: IDatabase;
	private createRole: ICreateRole;
	constructor(database: IDatabase, createRole: ICreateRole) {
		this.database = database;
		this.createRole = createRole;
	}
	async exec(payload: CompanyInput): Promise<Company> {
		try {
			await this.database.query({ text: 'BEGIN' });
			const result = await this.database.query({
				text: 'insert into companies (name) values ($1) returning *',
				values: [payload.name]
			});
			const companyResult = { ...result.rows[0] } as Company;
			const role = await this.createRole.createDefaultRole();
			await this.createCompanyRolesRow(companyResult.id, role.id);
			await this.createUserCompanyRow(payload.user_id, companyResult.id);
			await this.giveUserTheDefaultPermission(payload.user_id, role.id);

			await this.database.query({
				text: 'COMMIT'
			});

			companyResult.roles = await this.getCompanyRoles(companyResult.id);
			companyResult.user = await this.getOwner(payload.user_id);

			return companyResult;
		} catch (error) {
			console.error(error);
			await this.database.query({
				text: 'ROLLBACK'
			});
		}
	}

	async giveUserTheDefaultPermission(userId, roleId) {
		await this.database.query({
			text: 'insert into user_role (user_id, role_id) values ($1, $2)',
			values: [userId, roleId]
		});
	}

	async createCompanyRolesRow(
		companyId: number,
		roleId: number
	): Promise<void> {
		await this.database.query({
			text: 'insert into company_role(company_id, role_id) values ($1, $2)',
			values: [companyId, roleId]
		});
	}
	async createUserCompanyRow(userId: number, companyId: number): Promise<void> {
		await this.database.query({
			text: 'insert into user_company(user_id, company_id) values ($1, $2)',
			values: [userId, companyId]
		});
	}

	async getCompanyRoles(companyId: number): Promise<Role[]> {
		const rolesFromCompany = await this.database.query({
			text: 'SELECT r.id, r.name FROM roles r INNER JOIN company_role cr ON cr.role_id = r.id INNER JOIN companies c ON c.id = cr.company_id WHERE c.id = $1;',
			values: [companyId]
		});

		return rolesFromCompany.rows as Role[];
	}

	async getOwner(userId: number): Promise<User> {
		const owner = await this.database.query({
			text: 'SELECT u.* FROM users u INNER JOIN user_company uc ON uc.user_id = u.id INNER JOIN companies c ON uc.company_id = c.id WHERE u.id = $1;',
			values: [userId]
		});
		return owner.rows[0];
	}
}
const createCompany = new CreateCompany(database, createRole);
export default createCompany;
