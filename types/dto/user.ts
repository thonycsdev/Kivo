import { UserCompany, UserRole } from './entities_relations';

export type SignInRequest = {
	email: string;
	password: string;
};

export type SignUpRequest = {
	name: string;
	email: string;
	password: string;
};

export type User = {
	id: number;
	name: string;
	email: string;
	password: string;
	created_at: Date;
	updated_at: Date;
	user_company?: UserCompany[]; // Relacionamento opcional
	user_role?: UserRole[];
};
