import { Grid2 } from '@mui/material';
import CardForLayout from './card';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

async function fetcher(key: string) {
	const response = await fetch(key);
	const responseBody = await response.json();

	if (response.ok) {
		return responseBody;
	}
	throw responseBody.solution;
}
export default function HeaderTable({}) {
	const [companyId, setCompanyId] = useState<number | undefined>(undefined);
	const { data, isLoading } = useSWR(
		companyId ? `/api/v1/cliente/dashboard?company_id=${companyId}` : null,
		fetcher
	);

	useEffect(() => {
		if (!localStorage) return;
		const id = localStorage.getItem('company_id');
		setCompanyId(+id);
	}, []);

	if (isLoading && !data) return 'Loading....';
	const { active_clients, this_month_clients, uncontacted_clients } = data;

	return (
		<>
			<Grid2 container columns={3} spacing={3} m={'auto'} my={10} width={'80%'}>
				<CardForLayout label={'Número de Clientes'} content={active_clients} />
				<CardForLayout
					label={'Clientes Ainda Não Contactados'}
					content={uncontacted_clients}
				/>
				<CardForLayout
					label={'Novos Clientes esse Mês'}
					content={this_month_clients}
				/>
			</Grid2>
		</>
	);
}
