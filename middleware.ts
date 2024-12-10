import { getCookieSession } from 'models/cookies';
import { verifyPathProtectionLevel } from 'models/routes';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
	const { isProtectedRoute, isPublicRoute } = verifyPathProtectionLevel(req);
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
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
