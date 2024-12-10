import { User } from '@prisma/client';
import { jwtVerify, SignJWT } from 'jose';

const secretKey = 'Anthony';
const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(sessionData: User) {
	const session = new SignJWT(sessionData)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('3d')
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

export default Object.freeze({ encrypt, decrypt });
