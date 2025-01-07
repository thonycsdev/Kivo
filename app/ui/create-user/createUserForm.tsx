import {
	Box,
	Typography,
	TextField,
	Button,
	CircularProgress
} from '@mui/material';
import { Prisma, User } from '@prisma/client';
import api from 'infra/api';
import { setCookieSession } from 'models/cookies';
import { redirect } from 'next/navigation';

import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import alerts from '../alerts/alerts';

async function handleSuccess(data: User) {
	const { isConfirmed } = await alerts.successAlert({
		title: 'Sucesso!',
		text: 'Sua conta foi criada.',
		confirmButtonText: 'Acessar'
	});
	if (isConfirmed) {
		await setCookieSession(data);
		redirect('/crm');
	}
}
async function handleError(data: string) {
	await alerts.errorAlert(
		{
			title: 'Aconteceu um erro!',
			text: 'Aconteceu um ao criar sua conta. O erro já foi enviado para análise.',
			confirmButtonText: 'OK'
		},
		data
	);
}

export default function CreateUserForm() {
	const { register, handleSubmit } = useForm();
	const { trigger, isMutating } = useSWRMutation(
		'/api/v1/user/signUp',
		api.post,
		{
			onSuccess: handleSuccess,
			onError: handleError
		}
	);
	const submitFunction = async (data: Prisma.UserCreateInput) => {
		await trigger(data);
	};
	return (
		<form onSubmit={handleSubmit(submitFunction)}>
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
				<Typography fontSize={50}>Criação de Conta</Typography>
				<TextField
					{...register('name')}
					fullWidth
					id="outlined-basic"
					label="Nome Completo"
					type="text"
					variant="outlined"
				/>
				<TextField
					{...register('email')}
					fullWidth
					id="outlined-basic"
					label="Email"
					type="email"
					variant="outlined"
				/>
				<TextField
					fullWidth
					{...register('password')}
					id="outlined-basic"
					label="Senha"
					type="password"
					variant="outlined"
				/>

				<Button type="submit" sx={{ alignSelf: 'start' }} variant="contained">
					Cadastrar
				</Button>
				{isMutating && (
					<CircularProgress
						sx={{
							marginTop: 2
						}}
					/>
				)}
			</Box>
		</form>
	);
}
