import {
	Box,
	Button,
	TextField,
	Typography,
	CircularProgress
} from '@mui/material';
import { User } from '@prisma/client';
import keys from 'constants/keys';
import api from 'infra/api';
import { setCookieSession } from 'models/cookies';
import { redirect } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import Swal from 'sweetalert2';
import useSWRMutation from 'swr/mutation';
import { Credential } from 'types/credential';

async function handleSuccessSignIn(data: User) {
	await setCookieSession(data);
	redirect('/crm');
}

function handleErrorOnSignIn() {
	const alert = Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Suas credenciais de login não coincidem com uma conta em nosso sistema, por favor tente novamente.'
	});
	return alert;
}

export default function LoginForm() {
	const { trigger, isMutating } = useSWRMutation(
		keys.signIn,
		api.makeSignInRequest,
		{
			onError: handleErrorOnSignIn,
			onSuccess: handleSuccessSignIn
		}
	);
	const [credentials, setCredentials] = useState<Credential>({
		email: '',
		password: ''
	});

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCredentials({ ...credentials, password: event.target.value });
	};
	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCredentials({ ...credentials, email: event.target.value });
	};

	const handleSubmit = async () => {
		await trigger(credentials);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 3,
				p: 5,
				height: '100%',
				width: '100%',
				flexDirection: 'column'
			}}
		>
			<Typography fontSize={50}>Acesso de conta</Typography>
			<TextField
				onChange={handleEmailChange}
				value={credentials.email}
				fullWidth
				id="outlined-basic"
				label="Email"
				type="email"
				variant="outlined"
			/>
			<TextField
				onChange={handlePasswordChange}
				fullWidth
				id="outlined-basic"
				value={credentials.password}
				label="Senha"
				type="password"
				variant="outlined"
			/>
			<Button
				onClick={handleSubmit}
				sx={{ alignSelf: 'start' }}
				variant="contained"
				disabled={isMutating}
			>
				Entrar
			</Button>
			{isMutating && (
				<CircularProgress
					sx={{
						marginTop: 2
					}}
				/>
			)}
		</Box>
	);
}
