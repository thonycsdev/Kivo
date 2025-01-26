import DataRow from './dataRow';
import CompanyListRowSelect from './companyListRowSelect';
import { Box, LinearProgress } from '@mui/material';
import useSWR from 'swr';
import { User } from 'types/dto/user';

type props = {
	user: User;
};

async function fetcher(key: string) {
	const result = await fetch(key);
	const resultBody = await result.json();
	return resultBody;
}
export default function UserRowDataMenu({ user }: props) {
	const urlKey = `api/v1/user/companies?user_id=${user.id}`;
	const { data, isLoading } = useSWR(urlKey, fetcher);

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly',
				gap: '44px',
				mt: '26px'
			}}
		>
			<DataRow data={user.name} property="Nome" />
			<DataRow data={user.email} property="Email" />
			<DataRow data={'######'} property="Telefone" />
			<DataRow data={'######'} property="Endereco" />
			{isLoading && !data ? (
				<LinearProgress />
			) : (
				<CompanyListRowSelect companies={data} />
			)}
		</Box>
	);
}
