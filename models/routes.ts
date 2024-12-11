import { NextRequest } from 'next/server';
import { getCookieSession } from './cookies';
import { ErrorHandler } from 'utils/errorHandler';

const protectedRoutes = '/crm';
const publicRoutes = '/conta/acesso';

export function verifyPathProtectionLevel(req: NextRequest): {
	isProtectedRoute: boolean;
	isPublicRoute: boolean;
} {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = path.includes(protectedRoutes);
	const isPublicRoute = path.includes(publicRoutes);
	return { isProtectedRoute, isPublicRoute };
}

export async function lockApiRoutes(req: NextRequest) {
	if (
		req.nextUrl.pathname.startsWith('/api') &&
		!req.nextUrl.pathname.includes('/user')
	) {
		try {
			await protectApiRoute();
		} catch (err) {
			return err;
		}
	}
}

async function protectApiRoute() {
	const session = await getCookieSession();
	if (!session) {
		const erro = ErrorHandler.create(new Error('Unauthorized'), 401);
		erro.addSolution("You don't have permission to access this route.");
		throw erro;
	}
}
