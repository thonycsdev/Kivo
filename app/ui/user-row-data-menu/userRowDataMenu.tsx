import DataRow from './dataRow';
import CompanyListRowSelect from './companyListRowSelect';
import { Box } from '@mui/material';
import { User } from '@prisma/client';

type props = {
	user: User;
};
export default function UserRowDataMenu({ user }: props) {
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
			<CompanyListRowSelect />
		</Box>
	);
}
