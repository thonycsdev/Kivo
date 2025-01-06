import {
	Box,
	Typography,
	TextField,
	Button,
	CircularProgress
} from '@mui/material';
import { Prisma } from '@prisma/client';

import { useForm } from 'react-hook-form';
export default function CreateUserForm() {
	const { register, handleSubmit } = useForm();
	const submitFunction = (data: Prisma.UserCreateInput) => {
		console.log(data);
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
					{...register('password')}
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
					<CircularProgress
						sx={{
							marginTop: 2
						}}
					/>
				}
			</Box>
		</form>
	);
}
