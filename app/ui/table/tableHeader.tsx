import { Grid2 } from '@mui/material';
import CardForLayout from './card';
import useSWR from 'swr';

async function fetcher(key: string) {
	const response = await fetch(key);
	const responseBody = await response.json();

	if (response.ok) {
		return responseBody;
	}
	throw responseBody.solution;
}
type props = {
	clientAmount: number;
	newClientAmountThisMonth: number;
};
export default function HeaderTable({
	clientAmount,
	newClientAmountThisMonth
}: props) {
	const { data, isLoading } = useSWR('/api/v1/cliente/contacted', fetcher);

	if (isLoading) return 'Loaing....';

	return (
		<>
			<Grid2 container columns={3} spacing={3} m={'auto'} my={10} width={'80%'}>
				<CardForLayout label={'Número de Clientes'} content={clientAmount} />
				<CardForLayout
					label={'Clientes Ainda Não Contactados'}
					content={data.length}
				/>
				<CardForLayout
					label={'Novos Clientes esse Mês'}
					content={newClientAmountThisMonth}
				/>
			</Grid2>
		</>
	);
}
