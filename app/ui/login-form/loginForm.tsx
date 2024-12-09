import { Box, Button, TextField, Typography } from '@mui/material';
import keys from 'constants/keys';
import apiMethods from 'infra/apiMethods';
import { ChangeEvent, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { Credential } from 'types/credential';

export default function LoginForm() {
	const { trigger } = useSWRMutation(keys.signIn, apiMethods.makePostRequest, {
		onError: (error) => {
			alert(`Erro: ${error.message}, ${error.solution}`);
		},
		onSuccess: (data) => {
			alert(`Bem vindo ${data.name}`);
		}
	});
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
			>
				Entrar
			</Button>
		</Box>
	);
}
