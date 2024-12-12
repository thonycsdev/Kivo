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
import { ChangeEvent, useState } from 'react';
type props = {
	clients: Cliente[];
};

const columns: { label: string }[] = [
	{
		label: 'ID'
	},
	{
		label: 'Nome'
	},
	{
		label: 'Enderço'
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
export default function ClientTable({ clients }: props) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(1);
	const handleChangePage = (pageNumber: number) => {
		setPage(pageNumber);
	};
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
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
									bgcolor: 'secondary.main',
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
							<TableCell>{client.address}</TableCell>
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
				rowsPerPageOptions={[1, 10, 15]}
				component="div"
				labelRowsPerPage="Linhas por página"
				count={clients.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={(_, page) => handleChangePage(page)}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	);
}
