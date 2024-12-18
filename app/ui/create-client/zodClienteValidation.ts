import { z } from 'zod';

export const createClienteSchema = z.object({
	name: z.string(),
	cpf: z.string().length(11),
	address: z.string(),
	email: z.string().email(),
	phoneNumber: z.string().max(10).min(8),
	facebook: z.string().optional(),
	instagram: z.string().optional(),
	whatsapp: z.string().optional(),
	personalPhoneNumber: z.string().max(10).min(8),
	jobTitle: z.string(),
	jobPosition: z.string(),
	grossIncome: z.number().min(0),
	netIncome: z.number().min(0),
	hasFinancing: z.boolean(),
	hasFGTS: z.boolean(),
	maritalStatus: z.string(),
	familyMembersAmount: z.number().int(),
	description: z.string().optional(),
	birthDate: z.date()
});

export const publicClienteSchema = z.object({
	name: z.string(),
	cpf: z.string().length(11),
	email: z.string().email(),
	personalPhoneNumber: z.string().max(10).min(8),
	hasFinancing: z.boolean(),
	hasFGTS: z.boolean(),
	description: z.string().optional(),
	birthDate: z.date()
});
