'use client';
import { Container, LinearProgress, Paper } from '@mui/material';
import { Cliente } from '@prisma/client';
import CreateNewClientButton from 'app/ui/button/createNewClientButton';
import ModalCreateClient from 'app/ui/create-client/modal';
import SearchInput from 'app/ui/search/searchInput';
import ClientTable from 'app/ui/table/client';
import HeaderTable from 'app/ui/table/tableHeader';
import keys from 'constants/keys';
import { Suspense, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Pagination } from 'types/pagination';

const defaultPagination = {
	page: 0,
	rowsPerPage: 10
};

async function fetcher(
	url: string,
	pagination: Pagination = defaultPagination
) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(pagination)
	});
	const data = await response.json();
	return data;
}

async function fetcherByName(searchTerm: string) {
	const url = keys.client.all + `?name=${searchTerm}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!response.ok) return [];
	const data = await response.json();
	return data;
}

export default function Page() {
	const [pagination, setPagination] = useState<Pagination>(defaultPagination);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState<string | undefined>();

	const { data, isLoading, mutate } = useSWR(
		[keys.client.all, pagination],
		([key, paginationInfo]) => fetcher(key, paginationInfo)
	);

	useEffect(() => {
		if (searchTerm)
			mutate(() => fetcherByName(searchTerm).then((r) => r[0]), {
				revalidate: false
			});
	}, [searchTerm, mutate]);

	useEffect(() => {
		mutate();
	}, [pagination, mutate]);

	const handleClearPage = () => {
		mutate();
	};

	if (isLoading) return <LinearProgress />;

	const handleChangePage = (pageNumber: number) => {
		setPagination({ ...pagination, page: pageNumber });
	};
	const handleChangeRowsPerPage = (rowNumber: number) => {
		setPagination({ ...pagination, rowsPerPage: rowNumber });
	};

	const handleCreateClientModalInteraction = () => {
		setIsModalOpen((old) => !old);
	};

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column' }}>
			<HeaderTable
				clientAmount={data.total}
				newClientAmountThisMonth={
					filterAllClientsByCurrentMonth(data.clientes).length
				}
			/>
			<SearchInput
				onSearch={(term) => setSearchTerm(term)}
				onClearSearch={handleClearPage}
			/>
			<CreateNewClientButton onClick={handleCreateClientModalInteraction} />
			<ModalCreateClient
				isOpen={isModalOpen}
				onClose={handleCreateClientModalInteraction}
			/>
			<Suspense>
				<Paper variant="elevation" elevation={5}>
					<ClientTable
						clients={data.clientes}
						amount={data.total}
						pagination={pagination}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Paper>
			</Suspense>
		</Container>
	);
}

function filterAllClientsByCurrentMonth(clients: Cliente[]): Cliente[] {
	const currentMonth = new Date().getMonth();
	const result = clients.filter((c) => {
		const createdDate = new Date(c.createdAt);
		const createdMonth = createdDate.getMonth();
		return createdMonth === currentMonth;
	});
	return result;
}
