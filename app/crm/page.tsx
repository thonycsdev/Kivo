import { redirect } from 'next/navigation';

export default function Home() {
	const isUserAuthenticated = checkUserAuthentication();
	if (isUserAuthenticated) {
		redirect('/conta/acesso');
	}
	return (
		<div>
			<h1>PRAJA, A MELHOR CONSTRUTORA!</h1>
		</div>
	);
}

function checkUserAuthentication(): boolean {
	const isUserAuthenticated = true;
	return isUserAuthenticated;
}
