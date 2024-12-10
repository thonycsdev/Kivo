'use server';
import { User } from '@prisma/client';
import sessions from './session';
import { cookies } from 'next/headers';
export async function setCookieSession(data: User) {
	await createSession(data);
}

export async function getCookieSession() {}

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
