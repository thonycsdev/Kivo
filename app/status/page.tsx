'use client'
import useSWR from 'swr';
import { ResponseData } from '../api/v1/status/route';


async function fetcher(key: string) {

	const response = await fetch(key);
	const responseData = await response.json();
	return responseData;
}


export default function Status() {

	const { data, isLoading } = useSWR<ResponseData>('/api/v1/status', fetcher);
	if (isLoading) return <p>Loading...</p>
	return (
		<div>
			<h1>Status</h1>
			<p>{data.message}</p>
			<p>database: {JSON.stringify(data.database)}</p>
			<p>{data.created_at.toString()}</p>
		</div>
	);
}
