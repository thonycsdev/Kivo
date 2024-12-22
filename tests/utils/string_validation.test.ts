import string_validation from 'utils/string_validation';

describe('String Validation', () => {
	describe('CPF', () => {
		test('Valid', () => {
			const cpf = '909.581.454-82';
			const isValid = string_validation.CPF(cpf);
			expect(isValid).toBeTruthy();
		});
		test('Invalid', () => {
			const cpf = '123.123.123-12';
			const isValid = string_validation.CPF(cpf);
			expect(isValid).toBeFalsy();
		});
		describe('Same numbers', () => {
			test('Invalid', () => {
				const cpf = '111.111.111-11';
				const isValid = string_validation.CPF(cpf);
				expect(isValid).toBeFalsy();
			});
		});
	});
	describe('Phone Number', () => {
		test('Valid', () => {
			const personalPhoneNumber = '(51) 98675-6723';
			const isValid = string_validation.phoneNumber(personalPhoneNumber);
			expect(isValid).toBeTruthy();
		});
		test('Invalid', () => {
			const personalPhoneNumber = '(12) 4567-8910';
			const isValid = string_validation.phoneNumber(personalPhoneNumber);
			expect(isValid).toBeFalsy();
		});
		describe('Same numbers', () => {
			test('Invalid', () => {
				const personalPhoneNumber = '(11) 11111-1111';
				const isValid = string_validation.phoneNumber(personalPhoneNumber);
				expect(isValid).toBeFalsy();
			});
		});
	});
});
