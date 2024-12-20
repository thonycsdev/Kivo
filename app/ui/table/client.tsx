import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow
} from '@mui/material';
import { Cliente } from '@prisma/client';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import { ChangeEvent } from 'react';
import { Pagination } from 'types/pagination';
import format_string from 'utils/format_string';

type props = {
	clients: Cliente[];
	onChangePage: (pageNumber: number) => void;
	onChangeRowsPerPage: (rowsPerPage: number) => void;
	amount: number;
	pagination: Pagination;
};

const columns: { label: string }[] = [
	{
		label: 'ID'
	},
	{
		label: 'Nome'
	},
	{
		label: 'Potêncial de Venda'
	},
	{
		label: 'Telefone'
	},
	{
		label: 'Email'
	},
	{
		label: ''
	}
];
export default function ClientTable({
	clients,
	onChangePage,
	onChangeRowsPerPage,
	amount,
	pagination
}: props) {
	const handleChangePage = (pageNumber: number) => {
		onChangePage(pageNumber);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		onChangeRowsPerPage(+event.target.value);
	};

	return (
		<>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell
								sx={{
									width: 'auto',
									height: '20px',
									bgcolor: 'primary.main',
									color: 'white',
									fontSize: '1em',
									fontWeight: 'bold',
									minWidth: '100px'
								}}
								key={column.label}
							>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{clients.map((client) => (
						<TableRow hover role="checkbox" tabIndex={-1} key={client.id}>
							<TableCell>{client.id}</TableCell>
							<TableCell>{client.name}</TableCell>
							<TableCell>
								{format_string.makeSellingPotentialReadable(
									client.sellingPotentialTag
								)}
							</TableCell>
							<TableCell>{client.personalPhoneNumber}</TableCell>
							<TableCell>{client.email}</TableCell>
							<TableCell>
								<Paper
									elevation={2}
									sx={{
										maxWidth: 'fit-content',
										padding: 0.5,
										':hover': { cursor: 'pointer' }
									}}
								>
									<PersonSearchRoundedIcon />
								</Paper>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[1, 5, 10, 15]}
				component="div"
				labelRowsPerPage="Linhas por página"
				count={amount}
				rowsPerPage={pagination.rowsPerPage}
				page={pagination.page}
				onPageChange={(_, page) => handleChangePage(page)}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	);
}
