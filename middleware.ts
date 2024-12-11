import { getCookieSession } from 'models/cookies';
import { lockApiRoutes, verifyPathProtectionLevel } from 'models/routes';
import { NextRequest, NextResponse } from 'next/server';
import environment from 'utils/environment';

export default async function middleware(req: NextRequest) {
	const { isProtectedRoute, isPublicRoute } = verifyPathProtectionLevel(req);

	if (environment.isProductionEnvironment()) {
		const unauthorizedAccess = await lockApiRoutes(req);
		if (unauthorizedAccess) {
			return NextResponse.json(unauthorizedAccess, {
				status: unauthorizedAccess.statusCode
			});
		}
	}

	const session = await getCookieSession();
	if (isProtectedRoute && !session) {
		return NextResponse.redirect(new URL('/conta/acesso', req.nextUrl));
	}

	if (
		isPublicRoute &&
		session &&
		session.id &&
		req.nextUrl.pathname.startsWith('/conta')
	) {
		return NextResponse.redirect(new URL('/crm', req.nextUrl));
	}

	return NextResponse.next();
}
export const config = {
	matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)']
};
