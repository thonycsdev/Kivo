import { Box, MenuItem, Button, Divider, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DataRowTitle from './dataRowTitle';
import { Company } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
type props = {
	companies: Company[];
};
export default function CompanyListRowSelect({ companies }: props) {
	const defaultValue = companies.length ? companies[0].id : undefined;
	const [selectedCompany, setSelectedCompany] = useState(
		defaultValue.toString()
	);
	const router = useRouter();
	const handleSelect = (event: SelectChangeEvent<number>) => {
		setSelectedCompany(event.target.value.toString());
	};
	const handleCRMClick = () => {
		localStorage.setItem('company_id', selectedCompany);
		router.push('/crm/clientes');
	};
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
							<Select defaultValue={defaultValue} onChange={handleSelect}>
								{companies.map((c) => (
									<MenuItem key={c.id} value={c.id}>
										{c.name}
									</MenuItem>
								))}
							</Select>
							<Button onClick={handleCRMClick} variant="contained">
								Acessar CRM
							</Button>
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
