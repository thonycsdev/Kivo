import { Box, Select, MenuItem, Button, Divider } from '@mui/material';
import DataRowTitle from './dataRowTitle';

export default function CompanyListRowSelect() {
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
					<Select value={1}>
						<MenuItem value={1}>Praja</MenuItem>
					</Select>
					<Button variant="contained">Acessar CRM</Button>
				</Box>
			</Box>
			<Divider sx={{ width: '90%', mx: 'auto' }} />
		</>
	);
}
