import { Role } from './role';
import { User } from './user';

export type CompanyInput = {
	name: string;
	user_id: number;
};

export type Company = {
	id: number;
	name: string;
	user?: User; // Relacionamento opcional com UserCompany
	roles?: Role[]; // Relacionamento opcional com CompanyRole
};
