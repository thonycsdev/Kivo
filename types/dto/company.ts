export type CompanyRequest = {
	name: string;
	cnpj: string;
};

export type Company = {
	id: string;
	name: string;
	cnpj: string;
	created_at: Date;
};
