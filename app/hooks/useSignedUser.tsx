'use client';
import {
	closeCookieSession,
	getCookieSession,
	setCookieSession
} from 'models/cookies';
import { useRouter } from 'next/navigation';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react';
import { User } from 'types/dto/user';

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
	const router = useRouter();
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
		router.push('/user');
	};

	const signOut = async () => {
		await closeCookieSession();
		setUser(undefined);
		console.log('should redirect');
		router.push('/conta/acesso');
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
