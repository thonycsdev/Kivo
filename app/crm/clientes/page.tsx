'use client';
import { Container, LinearProgress, Paper } from '@mui/material';
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
	pagination: Pagination = defaultPagination,
	company_id: number
) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ pagination, company_id })
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

export default function Page({
	params
}: {
	params: Promise<{ company_id: string }>;
}) {
	const [companyId, setCompanyId] = useState<number | undefined>(undefined);
	const [pagination, setPagination] = useState<Pagination>(defaultPagination);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState<string | undefined>();

	params.then((x) => {
		setCompanyId(+x.company_id);
	});
	const { data, isLoading, mutate } = useSWR(
		[keys.client.all, pagination, companyId],
		([key, paginationInfo, company_id]) =>
			fetcher(key, paginationInfo, company_id)
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
			<HeaderTable />
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
