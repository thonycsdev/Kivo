import { Company } from './company';
import { Role } from './role';
import { User } from './user';

export type UserCompany = {
	userId: number;
	companyId: number;
	user?: User; // Relacionamento opcional com User
	company?: Company; // Relacionamento opcional com Company
};

export type UserRole = {
	userId: number;
	roleId: number;
	user?: User; // Relacionamento opcional com User
	role?: Role; // Relacionamento opcional com Role
};

export type CompanyRole = {
	companyId: number;
	roleId: number;
	company?: Company; // Relacionamento opcional com Company
	role?: Role; // Relacionamento opcional com Role
};
