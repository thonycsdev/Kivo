import { ErrorHandler } from '../../utils/errorHandler';

describe('Error handler Tests', () => {
	test('Should return a object of type Error', () => {
		const errorHandler = ErrorHandler.create(new Error('Error message'));
		expect(errorHandler).toBeInstanceOf(Error);
	});
	test('Should return a object with the error msg', () => {
		const errorHandler = ErrorHandler.create(new Error('Error messagexxx'));
		expect(errorHandler.message).toContain('Error message');
	});
	test('Should return the date when the error happend', () => {
		const errorHandler = ErrorHandler.create(new Error('Error message'));
		expect(errorHandler.created_at).toBeInstanceOf(Date);
		expect(errorHandler.created_at).toBeDefined();
	});
	test('Should return status code 500 when not status code is given', () => {
		const errorHandler = ErrorHandler.create(new Error('Error message'));
		expect(errorHandler.status_code).toBeDefined();
		expect(errorHandler.status_code).toBe(500);
	});
	test('Should return status code 404', () => {
		const errorHandler = ErrorHandler.create(new Error('Error message'), 404);
		expect(errorHandler.status_code).toBeDefined();
		expect(errorHandler.status_code).toBe(404);
	});
	test('Should return "no treated solution provided" when the solucion is empty or undefined', () => {
		const errorHandler = ErrorHandler.create(new Error('Error message'));
		expect(errorHandler.solution).toBe('no treated solution provided');
	});
	test('Should add the string solution to the property', () => {
		const errorHandler = ErrorHandler.create(new Error('Error message'));
		errorHandler.addSolution('Solution for the error');
		expect(errorHandler.solution).toBe('Solution for the error');
	});
});
