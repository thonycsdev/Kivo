import { faker } from '@faker-js/faker/.';
import { Company } from 'entities/company';
import { User } from 'entities/user';

describe('User Entity Domain', () => {
	test('Create Object', () => {
		const name = faker.person.fullName();
		const user = new User({ name });
		expect(user.getID()).toBeDefined();
		expect(user.getName()).toBe(name);
	});
	test('Add Company', () => {
		const name = faker.person.fullName();
		const user = new User({ name });
		const company = new Company({
			name,
			cnpj: faker.company.buzzAdjective(),
			owner_id: user.getID()
		});
		const company2 = new Company({
			name,
			cnpj: faker.company.buzzAdjective(),
			owner_id: user.getID()
		});
		user.addCompany(company.getID());
		user.addCompany(company2.getID());
		expect(user.getCompanies().length).toBe(2);
	});
});
