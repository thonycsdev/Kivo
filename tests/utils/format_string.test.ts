import format_string from 'utils/format_string';

describe('Format String Utils', () => {
	describe('CPF formatter', () => {
		test('Add Pontuation', () => {
			const cpfWithoutPontuation = '16128398782';
			const result = format_string.addCPFPontuation(cpfWithoutPontuation);
			expect(result).toBe('161.283.987-82');
		});
		test('Remove Pontuation', () => {
			const cpfWithoutPontuation = '161.283.987-82';
			const result = format_string.removeCPFPontuation(cpfWithoutPontuation);
			expect(result).toBe('16128398782');
		});
	});
});
