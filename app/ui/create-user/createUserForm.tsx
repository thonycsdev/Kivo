import {
	Box,
	Typography,
	TextField,
	Button,
	CircularProgress,
	useTheme
} from '@mui/material';
import { Prisma } from '@prisma/client';

import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useSWRMutation from 'swr/mutation';

async function postNewUser(
	key: string,
	{ arg }: { arg: Prisma.UserCreateInput }
) {
	const payload = JSON.stringify(arg);
	const r = await fetch(key, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: payload
	});
	if (!r.ok) {
		const erro = await r.json();
		throw erro.solution;
	}
}

async function handleSuccess(color: string) {
	const { isConfirmed } = await Swal.fire({
		title: 'Sucesso!',
		text: 'Sua Conta foi criada',
		icon: 'success',
		confirmButtonText: 'Acessar',
		confirmButtonColor: color
	});
	console.log(isConfirmed)
}
async function handleError(color: string) {
	const { isConfirmed } = await Swal.fire({
		title: 'Aconteceu um erro!',
		text: 'Aconteceu um ao criar sua conta. O erro já foi enviado para análise.',
		icon: 'error',
		confirmButtonText: 'OK',
		confirmButtonColor: color
	});
	console.log(isConfirmed)
}

export default function CreateUserForm() {
	const theme = useTheme();
	const { register, handleSubmit } = useForm();
	const { trigger, isMutating } = useSWRMutation('/api/v1/user/signUp', postNewUser, {
		onSuccess: () => handleSuccess(theme.palette.primary.main),
		onError: () => handleError(theme.palette.primary.main)
	});
	const submitFunction = async (data: Prisma.UserCreateInput) => {
		await trigger(data);
		console.log(isMutating)
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
				<TextField
					fullWidth
					id="outlined-basic"
					label="Confirmação de Senha"
					type="password"
					variant="outlined"
				/>

				<Button type="submit" sx={{ alignSelf: 'start' }} variant="contained">
					Cadastrar
				</Button>
				{
					isMutating && (

						<CircularProgress
							sx={{
								marginTop: 2
							}}
						/>
					)
				}
			</Box>
		</form>
	);
}
