import { faker } from '@faker-js/faker/.';
import { v4, version } from 'uuid';
import { Company, CompanyCreate } from 'entities/company';

describe('Company Entity Domain', () => {
	test('Create Object', () => {
		const name = faker.company.name();
		const owner_id = v4();
		const cnpj = faker.internet.ipv6();
		const input: CompanyCreate = {
			owner_id,
			cnpj,
			name
		};
		const company = new Company(input);
		expect(company.getName()).toBe(name);
		expect(company.getCNPJ()).toBe(cnpj);
		expect(company.getId()).toBeDefined();
		expect(company.getOwnerID()).toBe(owner_id);
		expect(version(company.getId())).toBe(4);
		expect(company.getCreationDate()).toBeDefined();
	});
	describe('Error Handling', () => {
		const name = faker.company.name();
		const owner_id = v4();
		const cnpj = faker.internet.ipv6();

		test('Without Name', () => {
			const input: CompanyCreate = {
				owner_id,
				cnpj,
				name: ''
			};
			const action = () => new Company(input);
			expect(action).toThrow('Company name is required');
		});
		test('Without CNPJ', () => {
			const input: CompanyCreate = {
				owner_id,
				cnpj: '',
				name
			};
			const action = () => new Company(input);
			expect(action).toThrow('Company cnpj is required');
		});
		test('Without Owner', () => {
			const input: CompanyCreate = {
				owner_id: '',
				cnpj,
				name
			};
			const action = () => new Company(input);
			expect(action).toThrow('Company Owner is required');
		});
	});
});
