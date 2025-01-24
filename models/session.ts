import { User } from 'types/dto/user';
import { jwtVerify, SignJWT } from 'jose';
import environment from 'utils/environment';

const secretKey = getSecret();
const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(sessionData: User, expirationTime: Date) {
	const session = new SignJWT(sessionData)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(
			expirationTime ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
		)
		.sign(encodedKey);

	return session;
}

export async function decrypt(session: string | undefined = '') {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256']
		});
		return payload;
	} catch (error) {
		console.log(`Failed to verify session,ERROR: ${error}`);
	}
}

function getSecret() {
	return environment.isProductionEnvironment()
		? process.env.SECRET_KEY
		: 'development';
}
export default Object.freeze({ encrypt, decrypt });
