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

export default function CreateClientForm() {
	return (
		<>
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
						<TextField fullWidth required label="Nome Completo" />
					</Grid2>
					<TextField required label="CPF" />
					<Grid2 size={2}>
						<TextField fullWidth required label="Endereço" />
					</Grid2>
					<Grid2 size={2}>
						<TextField fullWidth required label="Email" />
					</Grid2>
					<TextField label="Número de Telefone" />
					<TextField required label="Número de Telefone Pessoal" />
					<TextField label="Facebook" />
					<TextField label="Instagram" />
					<TextField label="Whatsapp" />
					<TextField required label="Estado Civil" />
					<Grid2 container size={4} rowSpacing={4}>
						<TextField required label="Renda Liquida" />
						<TextField required label="Renda Bruta" />
						<Grid2>
							<DatePicker label="Data de Nascimento" />
						</Grid2>
						<TextField
							required
							type="number"
							defaultValue={1}
							label="Quantidade de Membros na Família"
						/>
						<TextField required label="Ocupação" />
						<TextField label="Cargo" />
						<FormControlLabel
							required
							control={<Switch />}
							label="Possui FGTS"
						/>
						<FormControlLabel
							required
							control={<Switch />}
							label="Possui Algum Financiamento"
						/>
					</Grid2>
					<Grid2 size={3}>
						<TextField fullWidth required multiline label="Descrição" />
					</Grid2>
				</Grid2>
				<Box sx={{ alignSelf: 'end', display: 'flex', gap: 3 }}>
					<Button variant="contained" sx={{ width: '200px' }}>
						Cadastrar
					</Button>
					<Button variant="outlined" sx={{ width: '200px' }}>
						Limpar
					</Button>
				</Box>
			</Container>
		</>
	);
}
