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
import CPFInputWithMask from './CPFInputWithMask';
import PhoneInputWithMask from './phoneInputWithMask';

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

export default function CreateClientForm() {
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
					justifyContent: 'space-around',
					height: '900px'
				}}
			>
				<Box>
					<Typography fontSize={'30px'} fontWeight={'bold'}>
						Cadastro de novo cliente
					</Typography>
					<Divider />
				</Box>
				<Grid2 container columns={4} spacing={4}>
					<Grid2 size={3}>
						<TextField
							{...register('name')}
							fullWidth
							required
							label="Nome Completo"
						/>
					</Grid2>
					<Grid2 size={2}>
						<CPFInputWithMask register={control} />
					</Grid2>
					<Grid2 size={2}>
						<PhoneInputWithMask register={control} />
					</Grid2>
					<Grid2 size={2}>
						<TextField
							fullWidth
							required
							label="Endereço"
							{...register('address')}
						/>
					</Grid2>
					<Grid2 size={2}>
						<TextField
							fullWidth
							required
							label="Email"
							{...register('email')}
						/>
					</Grid2>
					<TextField label="Facebook" {...register('facebook')} />
					<TextField label="Instagram" {...register('instagram')} />
					<TextField label="Whatsapp" {...register('whatsapp')} />
					<Box>
						<InputLabel>Estado Civil</InputLabel>
						<Select
							defaultValue={'SOLTEIRO'}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setValue('maritalStatus', e.target.value)
							}
							label="Estado Civil"
							{...register('maritalStatus')}
						>
							<MenuItem value={'CASADO'}>CASADO</MenuItem>
							<MenuItem value={'VIUVO'}>VIUVO</MenuItem>
							<MenuItem value={'SOLTEIRO'}>SOLTEIRO</MenuItem>
							<MenuItem value={'DIVORCIADO'}>DIVORCIADO</MenuItem>
						</Select>
					</Box>
					<Grid2 container size={4} rowSpacing={4}>
						<TextField
							required
							type="number"
							label="Renda Liquida"
							{...register('netIncome', { valueAsNumber: true })}
						/>
						<TextField
							required
							type="number"
							label="Renda Bruta"
							{...register('grossIncome', { valueAsNumber: true })}
						/>
						<Grid2>
							<Controller
								control={control}
								name="birthDate"
								render={({ field: { onChange } }) => (
									<DatePicker onChange={onChange} label="Data de Nascimento" />
								)}
							/>
						</Grid2>
						<TextField
							required
							type="number"
							defaultValue={1}
							label="Quantidade de Membros na Família"
							{...register('familyMembersAmount', { valueAsNumber: true })}
						/>
						<TextField required label="Ocupação" {...register('jobTitle')} />
						<TextField label="Cargo" {...register('jobPosition')} />
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
					</Grid2>
					<Grid2 size={3}>
						<TextField
							{...register('description')}
							fullWidth
							required
							multiline
							label="Descrição"
						/>
					</Grid2>
				</Grid2>
				<Box sx={{ alignSelf: 'end', display: 'flex', gap: 3 }}>
					{loadingHandler()}
					<Button
						onClick={() => reset()}
						variant="outlined"
						sx={{ width: '200px' }}
					>
						Limpar
					</Button>
				</Box>
			</Container>
		</form>
	);
}
