import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/conta/acesso'
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith('/crm');
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/crm', nextUrl));
			}
			return true;
		}
	},
	providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig;
