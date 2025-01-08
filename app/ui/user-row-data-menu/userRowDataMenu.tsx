import DataRow from './dataRow';
import CompanyListRowSelect from './companyListRowSelect';
import { Box } from '@mui/material';
import { LoggedUser } from 'types/dto/loggedUser';

type props = {
	user: LoggedUser;
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
			<DataRow data={user.phoneNumber} property="Telefone" />
			<DataRow data={user.address} property="Endereco" />
			<CompanyListRowSelect />
		</Box>
	);
}
