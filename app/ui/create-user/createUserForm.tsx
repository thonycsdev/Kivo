import {
	Box,
	Typography,
	TextField,
	Button,
	CircularProgress
} from '@mui/material';
import api from 'infra/api';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import alerts from '../alerts/alerts';
import { useSignedUser } from 'app/hooks/useSignedUser';
import { SignUpRequest, User } from 'types/dto/user';

async function handleSuccess() {
	await alerts.successAlert({
		title: 'Sucesso!',
		text: 'Sua conta foi criada.',
		confirmButtonText: 'Acessar'
	});
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
	const { signIn } = useSignedUser();
	const { register, handleSubmit } = useForm();
	const { trigger, isMutating } = useSWRMutation(
		'/api/v1/user/signUp',
		api.post,
		{
			onSuccess: async (data) => {
				handleSuccess();
				signIn(data as User);
			},
			onError: handleError
		}
	);
	const submitFunction = async (data: SignUpRequest) => {
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
