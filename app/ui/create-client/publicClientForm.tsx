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
	SelectChangeEvent,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { MeansOfCommunication, Prisma } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { publicClienteSchema } from './zodClienteValidation';
import useSWRMutation from 'swr/mutation';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { PreferredCommunication } from 'constants/preferredCommunicationsEnum';
import conversions from 'utils/conversions';
import { IMaskInput } from 'react-imask';
import string_validation from 'utils/string_validation';
import format_string from 'utils/format_string';

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
	const router = useRouter();
	const { trigger, isMutating } = useSWRMutation(
		'/api/v1/cliente',
		postNewCliente
	);
	const {
		register,
		handleSubmit,
		control,
		setValue,
		reset,
		formState: { errors }
	} = useForm<Prisma.ClienteCreateInput>({
		resolver: zodResolver(publicClienteSchema)
	});

	console.log(errors);

	const handleOnSelect = (event: SelectChangeEvent<string>) => {
		if (!event.target.value) return;
		const value = event.target.value as MeansOfCommunication;
		setValue('preferredMeansOfCommunication', value);
	};

	const handleOnSubmit = async (data: Prisma.ClienteCreateInput) => {
		await trigger(data);
		const { isConfirmed } = await Swal.fire({
			title: 'Contato Enviado!',
			text: 'Logo entraremos em contato com você!',
			icon: 'success',
			confirmButtonText: 'OK',
			confirmButtonColor: 'primary.main'
		});

		if (isConfirmed) {
			router.push('https://www.prajaconstrutora.com.br/');
		}
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
		<>
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignContent: 'center',
						width: '100%'
					}}
				>
					<Box>
						<Typography
							textAlign={'center'}
							fontSize={'30px'}
							fontWeight={'bold'}
						>
							Praja Construtora
						</Typography>
						<Divider />
					</Box>
					<Grid2 container sx={{ mt: 3 }} spacing={2}>
						<TextField
							fullWidth
							{...register('name')}
							label="Nome Completo"
							required
						/>
						<Controller
							control={control}
							name="cpf"
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									label="CPF"
									slotProps={{
										input: {
											inputComponent: IMaskInput,
											inputProps: { mask: '000.000.000-00' }
										}
									}}
									required
									onChange={(e) => {
										const cpf = e.target.value;
										if (string_validation.CPF(cpf)) {
											const cpfWithoutPontuation =
												format_string.removeCPFPontuation(cpf);
											//valida o cpf, retira os pontos ao enviar pro submit
											field.onChange(cpfWithoutPontuation);
										}
									}}
								/>
							)}
						/>
						<TextField
							fullWidth
							{...register('email')}
							label="Email"
							required
						/>
						<Controller
							control={control}
							name="personalPhoneNumber"
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									label="Telefone de Contato"
									slotProps={{
										input: {
											inputComponent: IMaskInput,
											inputProps: { mask: '(00) 00000-0000' }
										}
									}}
									required
									onChange={(e) => {
										const personalPhoneNumber = e.target.value;
										if (string_validation.phoneNumber(personalPhoneNumber)) {
											const phoneNumberWithoutPontuation =
												format_string.removePhoneNumberPontuation(
													personalPhoneNumber
												);
											field.onChange(phoneNumberWithoutPontuation);
										}
									}}
								/>
							)}
						/>
						<Box width={'100%'}>
							<InputLabel>Prefiro contato por</InputLabel>
							<Select
								label="Prefiro contato por"
								fullWidth
								onChange={handleOnSelect}
							>
								{conversions.enumToArray(PreferredCommunication).map((item) => (
									<MenuItem value={item} key={item}>
										{item}
									</MenuItem>
								))}
							</Select>
						</Box>

						<Controller
							control={control}
							name="birthDate"
							render={({ field: { onChange } }) => (
								<DatePicker
									sx={{ width: '100%' }}
									onChange={onChange}
									label="Data de Nascimento"
								/>
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
						<TextField
							fullWidth
							{...register('description')}
							label="Mensagem"
							multiline
							maxRows={6}
						/>
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
		</>
	);
}
