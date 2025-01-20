import ClientStatus from 'constants/client_status';
import MeansOfCommunication from 'constants/preferredCommunicationsEnum';
import SellingPotention from 'constants/selling_potention';
export interface ClientRequest {
	name: string;
	cpf: string;
	address?: string;
	email: string;
	phoneNumber?: string;
	facebook?: string;
	instagram?: string;
	whatsapp?: string;
	personalPhoneNumber: string;
	jobTitle?: string;
	jobPosition?: string;
	grossIncome?: number;
	netIncome?: number;
	hasFinancing: boolean;
	hasFGTS: boolean;
	sellingPotentialTag?: SellingPotention;
	maritalStatus?: string;
	familyMembersAmount?: number;
	description?: string;
	company_id: number;
	preferredMeansOfCommunication: MeansOfCommunication;
	hasBeenContacted: boolean;
	status: ClientStatus;
	birthDate: Date;
}

export interface Client {
	id: number;
	name: string;
	cpf: string;
	address?: string;
	email: string;
	phoneNumber?: string;
	facebook?: string;
	instagram?: string;
	whatsapp?: string;
	personalPhoneNumber: string;
	jobTitle?: string;
	jobPosition?: string;
	grossIncome?: number;
	netIncome?: number;
	hasFinancing: boolean;
	hasFGTS: boolean;
	sellingPotentialTag?: SellingPotention;
	maritalStatus?: string;
	familyMembersAmount?: number;
	description?: string;
	company_id: number;
	preferredMeansOfCommunication: MeansOfCommunication;
	hasBeenContacted: boolean;
	status: ClientStatus;
	birthDate: Date;
	createdAt: Date;
	updatedAt: Date;
}
