'use client';
import { User } from '@prisma/client';
import {
	closeCookieSession,
	getCookieSession,
	setCookieSession
} from 'models/cookies';
import { redirect } from 'next/navigation';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react';

interface UserContextInterface {
	user: User;
	signIn: (data: User) => Promise<void>;
	signOut: () => Promise<void>;
}

interface userContextProps {
	children: ReactNode;
}

export const UserContext = createContext<UserContextInterface | undefined>(
	undefined
);

export function UserContextProvider({ children }: userContextProps) {
	const [user, setUser] = useState<User | undefined>(undefined);
	useEffect(() => {
		if (!user) {
			getCookieSession().then((x) => {
				setUser(x as User);
			});
		}
	}, [user]);
	const signIn = async (data) => {
		await setCookieSession(data);
		setUser(data);
		redirect('/crm');
	};

	const signOut = async () => {
		await closeCookieSession();
		redirect('/conta/acesso');
	};
	return (
		<UserContext.Provider value={{ user, signIn, signOut }}>
			{children}
		</UserContext.Provider>
	);
}

export const useSignedUser = () => {
	const context = useContext(UserContext);
	if (!context)
		throw new Error(
			'Voce precisa utitlizar o hook onde o provider esteja cobrindo'
		);
	return context;
};
