import { UserRole, CompanyRole } from './entities_relations';

export type Role = {
	id: number;
	name: string;
	userRole?: UserRole[]; // Relacionamento opcional com UserRole
	companyRole?: CompanyRole[]; // Relacionamento opcional com CompanyRole
};
