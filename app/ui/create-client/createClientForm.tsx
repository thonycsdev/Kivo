import {
	Box,
	Button,
	Container,
	Divider,
	FormControlLabel,
	Grid2,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Prisma } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';

export default function CreateClientForm() {
	const { register, handleSubmit, control } = useForm<Prisma.ClienteCreateInput>();
	const handleOnSubmit = (data: Prisma.ClienteCreateInput) => {
		console.log(data);
	}
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
						<TextField {...register('name')} fullWidth required label="Nome Completo" />
					</Grid2>
					<TextField required label="CPF" {...register('cpf')} />
					<Grid2 size={2}>
						<TextField fullWidth required label="Endereço" {...register('address')} />
					</Grid2>
					<Grid2 size={2}>
						<TextField fullWidth required label="Email" {...register('email')} />
					</Grid2>
					<TextField label="Número de Telefone" {...register('phoneNumber')} />
					<TextField required label="Número de Telefone Pessoal" {...register('personalPhoneNumber')} />
					<TextField label="Facebook" {...register('facebook')} />
					<TextField label="Instagram" {...register('instagram')} />
					<TextField label="Whatsapp" {...register('whatsapp')} />
					<TextField required label="Estado Civil" {...register('maritalStatus')} />
					<Grid2 container size={4} rowSpacing={4}>
						<TextField required label="Renda Liquida" {...register('netIncome')} />
						<TextField required label="Renda Bruta" {...register('grossIncome')} />
						<Grid2>
							<Controller
								control={control}
								name="birthDate"
								render={({
									field: { onChange },
								}) => (
									<DatePicker onChange={onChange} label="Data de Nascimento" />
								)}
							/>
						</Grid2>
						<TextField
							required
							type="number"
							defaultValue={1}
							label="Quantidade de Membros na Família"
							{...register('familyMembersAmount')}
						/>
						<TextField required label="Ocupação"{...register('jobTitle')} />
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
						<TextField {...register('description')} fullWidth required multiline label="Descrição" />
					</Grid2>
				</Grid2>
				<Box sx={{ alignSelf: 'end', display: 'flex', gap: 3 }}>
					<Button variant="contained" sx={{ width: '200px' }} type='submit'>
						Cadastrar
					</Button>
					<Button variant="outlined" sx={{ width: '200px' }}>
						Limpar
					</Button>
				</Box>
			</Container>
		</form>
	);
}
