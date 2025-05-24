export type CompanyRequest = {
	name: string;
	cnpj: string;
	user_id: string;
};

export type Company = {
	id: string;
	name: string;
	cnpj: string;
	created_at: Date;
};
