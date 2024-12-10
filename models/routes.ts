import { NextRequest } from 'next/server';

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
