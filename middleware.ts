import { decrypt } from 'models/session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = '/crm';
const publicRoutes = '/conta/acesso';

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = path.includes(protectedRoutes);
	const isPublicRoute = path.includes(publicRoutes);

	// 3. Decrypt the session from the cookie
	const cookie = (await cookies()).get('session')?.value;
	const session = await decrypt(cookie);

	// 4. Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !session) {
		return NextResponse.redirect(new URL('/conta/acesso', req.nextUrl));
	}

	// 5. Redirect to /dashboard if the user is authenticated
	console.log(session);
	if (
		isPublicRoute &&
		session &&
		session.userId &&
		req.nextUrl.pathname.startsWith('/conta')
	) {
		console.log('Redireciona');
		return NextResponse.redirect(new URL('/crm', req.nextUrl));
	}

	return NextResponse.next();
}
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
