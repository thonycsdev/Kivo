import { Pagination } from 'types/pagination';
import { Company } from './company';
export interface ClienteRequest {
	name: string;
	company_id: string;
}

export interface Cliente {
	id: number;
	name: string;
	company: Company;
	createdAt: Date;
}

export interface ClientePaginationRequest {
	company_id: number;
	pagination: Pagination;
}

export interface ClienteWithTotalAmountResponse {
	clientes: Cliente[];
	total: number;
}
