import bcrypt from 'bcrypt';
import environment from 'utils/environment';
async function hashPassword(password: string): Promise<string> {
	const saltRounds = getSaltRounds();
	const hash = await bcrypt.hash(password, saltRounds);
	return hash;
}

async function compare(
	providedPassword: string,
	storedHash: string
): Promise<boolean> {
	const result = await bcrypt.compare(providedPassword, storedHash);
	return result;
}

function getSaltRounds() {
	if (environment.isProductionEnvironment()) return 14;
	return 1;
}

const authentication = { hashPassword, compare };

export default authentication;
