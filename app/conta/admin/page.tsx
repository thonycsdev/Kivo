'use client';
import { ChangeEvent, useState } from 'react';

type Payload = {
	email: string;
	password: string;
	admin_password: string;
	name: string;
};

async function adminSignIn(passwd) {
	const response = await fetch('/api/v1/admin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ passwd })
	});
	const data = await response.json();
	return data;
}

async function createAccount(payload: Payload) {
	const response = await fetch('/api/v1/user/signUp', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});
	const data = await response.json();
	return data;
}

export default function Page() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [passwd, setPasswd] = useState('');
	const [payload, setPayload] = useState<Payload>({
		email: '',
		password: '',
		admin_password: '',
		name: ''
	});

	const handleAdminPassword = (event: ChangeEvent<HTMLInputElement>) => {
		setPasswd(event.target.value);
	};
	const submitAdminPassword = async () => {
		if (passwd.length < 20) return;
		const result = await adminSignIn(passwd);
		if (result) {
			setIsAdmin(true);
			setPayload({ ...payload, admin_password: passwd });
		}
	};
	const handleName = (event: ChangeEvent<HTMLInputElement>) => {
		setPayload({ ...payload, name: event.target.value });
	};
	const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
		setPayload({ ...payload, email: event.target.value });
	};
	const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
		setPayload({ ...payload, password: event.target.value });
	};
	const submitCreateAccount = async () => {
		await createAccount(payload)
			.then(() => alert('Conta criada com sucesso'))
			.catch(() => alert('Erro ao criar conta'));
	};
	const formAdminSignIn = (
		<>
			<input type="password" minLength={20} onChange={handleAdminPassword} />
			<button onClick={submitAdminPassword}>Sign in</button>
		</>
	);
	const formCreateAccount = (
		<>
			<label>
				<span>name</span>
				<input onChange={handleName} type="text" name="name" />
			</label>
			<label>
				<span>email</span>
				<input onChange={handleEmail} type="text" name="email" />
			</label>
			<label>
				<span>Password</span>
				<input type="password" onChange={handlePassword} name="password" />
			</label>
			<button onClick={submitCreateAccount}>Create account</button>
		</>
	);
	return (
		<>
			<h1>ADMIN create account</h1>
			{isAdmin ? formCreateAccount : formAdminSignIn}
		</>
	);
}
