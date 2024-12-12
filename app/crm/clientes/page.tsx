'use client';
import { Paper } from '@mui/material';
import ClientTable from 'app/ui/table/client';
import useSWR from 'swr';

async function fetcher(url: string) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}
export default function Page() {
	const { data, isLoading, error } = useSWR('/api/v1/cliente/all', fetcher);
	if (!isLoading) {
		console.log(data);
	}
	if (isLoading) return <div>Carregando...</div>;
	if (error) return <div>Ocorreu um erro ao carregar os clientes</div>;
	return (
		<>
			<Paper
				sx={{
					width: '80%',
					margin: 'auto'
				}}
				variant="elevation"
				elevation={5}
			>
				<ClientTable clients={data} />
			</Paper>
		</>
	);
}
