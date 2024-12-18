
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Divider,
	FormControlLabel,
	Grid2,
	InputLabel,
	MenuItem,
	Select,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Prisma } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClienteSchema } from './zodClienteValidation';
import useSWRMutation from 'swr/mutation';
import { ChangeEvent } from 'react';

async function postNewCliente(
	key: string,
	{ arg }: { arg: Prisma.ClienteCreateInput }
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

export default function PublicClientForm() {
	const { trigger, isMutating } = useSWRMutation(
		'/api/v1/cliente',
		postNewCliente,
		{
			onSuccess: () => alert('Cliente cadastrado!'),
			onError: (err) => alert(`Aconteceu um erro: ${err} `)
		}
	);
	const { register, handleSubmit, control, setValue, reset } =
		useForm<Prisma.ClienteCreateInput>({
			resolver: zodResolver(createClienteSchema)
		});
	const handleOnSubmit = async (data: Prisma.ClienteCreateInput) => {
		await trigger(data);
	};
	const loadingHandler = () => {
		if (isMutating) {
			return <CircularProgress />;
		}
		return (
			<Button variant="contained" sx={{ width: '200px' }} type="submit">
				Cadastrar
			</Button>
		);
	};
	return (
		<form onSubmit={handleSubmit(handleOnSubmit)}>
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignContent: "center",
					width: '100%'
				}}
			>
				<Box>
					<Typography textAlign={'center'} fontSize={'30px'} fontWeight={'bold'}>
						Praja Construtora
					</Typography>
					<Divider />
				</Box>
				<Grid2 container sx={{ mt: 3 }} spacing={2}>
					<TextField fullWidth  {...register('name')} label="Nome Completo" required />
					<TextField fullWidth  {...register('cpf')} label="CPF" required />
					<TextField fullWidth  {...register('email')} label="Email" required />
					<TextField fullWidth  {...register('personalPhoneNumber')} label="Telefone de Contato" required />
					<Box width={"100%"}>
						<InputLabel>Prefiro contato por</InputLabel>
						<Select
							defaultValue={'WHATSAPP'}
							label="Prefiro contato por"
							fullWidth
						>
							<MenuItem value={'WHATSAPP'}>WHATSAPP</MenuItem>
							<MenuItem value={'CHAMADA'}>CHAMADA</MenuItem>
						</Select>
					</Box>

					<Controller
						control={control}
						name="birthDate"
						render={({ field: { onChange } }) => (
							<DatePicker sx={{ width: '100%' }} onChange={onChange} label="Data de Nascimento" />
						)}
					/>

					<FormControlLabel
						control={<Switch />}
						{...register('hasFGTS')}
						label="Possui FGTS"
					/>
					<FormControlLabel
						{...register('hasFinancing')}
						control={<Switch />}
						label="Possui Algum Financiamento"
					/>
					<TextField fullWidth  {...register('description')} label="Mensagem" multiline maxRows={6} />
				</Grid2>
				<Box sx={{ m: 3, display: 'flex', gap: 3 }}>
					{loadingHandler()}
					<Button
						onClick={() => reset()}
						variant="outlined"
						sx={{ width: '100px' }}
					>
						Limpar
					</Button>
				</Box>
			</Container>
		</form>
	);
}
