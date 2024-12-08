import { Box, Button, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Credential } from 'types/credential';

export default function LoginForm() {
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

	const handleSubmit = () => {
		console.log(credentials);
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
