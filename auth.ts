// import { authConfig } from 'auth.config';
// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import { Credential } from 'types/credential';
//
// export const {} = NextAuth({
// 	...authConfig,
// 	providers: [
// 		Credentials({
// 			async authorize(credentials) {
// 				const payload: Credential = credentials;
// 				const user = await getUser(payload);
// 				if (!user) return null;
//
// 				const match = bycrypt.compare(user.password, payload.password);
// 				if (match) return user;
//
// 				if (user) return null;
// 			}
// 		})
// 	]
// });
//
// async function getUser(credentials: {
// 	email: string;
// 	password: string;
// }): Promise<string> {
// 	console.log(credentials);
// 	return null;
// }
