import {
	Box,
	Select,
	MenuItem,
	Button,
	Divider,
	Typography
} from '@mui/material';
import DataRowTitle from './dataRowTitle';
import { Company } from '@prisma/client';
type props = {
	companies: Company[];
};
export default function CompanyListRowSelect({ companies }: props) {
	const defaultValue = companies.length ? companies[0].id : undefined;
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%'
				}}
			>
				<DataRowTitle propertyTitle="Empresas" />
				<Box
					width={'50%'}
					display={'flex'}
					justifyContent={'space-around'}
					maxHeight={'45px'}
				>
					{defaultValue ? (
						<>
							<Select defaultValue={defaultValue}>
								{companies.map((c) => (
									<MenuItem key={c.id} value={c.id}>
										{c.name}
									</MenuItem>
								))}
							</Select>
							<Button variant="contained">Acessar CRM</Button>
						</>
					) : (
						<Typography>Você ainda não cadastrou uma empresa</Typography>
					)}
				</Box>
			</Box>
			<Divider sx={{ width: '90%', mx: 'auto' }} />
		</>
	);
}
