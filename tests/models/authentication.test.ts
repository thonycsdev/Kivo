import authentication from 'models/authentication';

describe('Authentication', () => {
	describe('Sign Up', () => {
		test('Password Hash', async () => {
			const password = 'password';
			const passwordHashed = await authentication.hashPassword(password);

			expect(passwordHashed).not.toBe(password);
			expect(passwordHashed.length).toBeGreaterThan(password.length);
		});

		test('Compare Hashes', async () => {
			const password = 'password';
			const password2 = 'password2';
			const storedHash = await authentication.hashPassword(password);
			const areTheSame = await authentication.compare(password, storedHash);
			const notTheSame = await authentication.compare(password2, storedHash);

			expect(areTheSame).toBeTruthy();
			expect(notTheSame).toBeFalsy();
		});
	});
});
