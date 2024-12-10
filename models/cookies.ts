'use server';
import { User } from '@prisma/client';
import sessions from './session';
import { cookies } from 'next/headers';
export async function setCookieSession(data: User) {
	await createSession(data);
}
export async function closeCookieSession() {
	await deleteSession();
}

export async function getCookieSession() {
	const cookiesStore = await cookies();
	const session = cookiesStore.get('session')?.value;
	if (!session) {
		return null;
	}
	return await sessions.decrypt(session);
}

async function deleteSession() {
	const cookiesStore = await cookies();
	cookiesStore.set('session', '', {
		expires: new Date(0),
		httpOnly: true,
		secure: true,
		sameSite: 'strict'
	});
}
async function createSession(data: User): Promise<void> {
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
	const session = await sessions.encrypt(data, expiresAt);
	const cookiesStore = await cookies();
	cookiesStore.set('session', session, {
		expires: expiresAt,
		httpOnly: true,
		secure: true,
		sameSite: 'strict'
	});
}
