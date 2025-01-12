import {
	Box,
	Button,
	TextField,
	Typography,
	CircularProgress
} from '@mui/material';
import { useSignedUser } from 'app/hooks/useSignedUser';
import keys from 'constants/keys';
import api from 'infra/api';
import { redirect } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import Swal from 'sweetalert2';
import useSWRMutation from 'swr/mutation';
import { Credential } from 'types/credential';

function handleErrorOnSignIn() {
	const alert = Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Suas credenciais de login não coincidem com uma conta em nosso sistema, por favor tente novamente.'
	});
	return alert;
}

export default function LoginForm() {
	const { signIn } = useSignedUser();
	const { trigger, isMutating } = useSWRMutation(
		keys.signIn,
		api.makeSignInRequest,
		{
			onError: handleErrorOnSignIn,
			onSuccess: async (data) => {
				await signIn(data);
			}
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

	const handleCreateAccountClick = () => {
		redirect('/conta/criar');
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
			<Box
				display={'flex'}
				justifyContent={'start'}
				width={'100%'}
				gap={'10px'}
			>
				<Button
					onClick={handleSubmit}
					sx={{ alignSelf: 'start' }}
					variant="contained"
					disabled={isMutating}
				>
					Entrar
				</Button>
				<Button
					onClick={handleCreateAccountClick}
					sx={{ alignSelf: 'start' }}
					variant="outlined"
					disabled={isMutating}
				>
					Criar Conta
				</Button>
			</Box>
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
