'use client';
import { ResponseData } from 'app/api/v1/status/route';
import keys from 'constants/keys';
import fetcher from 'infra/fetcher';
import useSWR from 'swr';

export default function Status() {
	const { data, isLoading } = useSWR<ResponseData>(keys.status, fetcher);
	if (isLoading) return <p>Loading...</p>;
	return (
		<div>
			<h1>Status</h1>
			<p>{data.message}</p>
			<p>database: {JSON.stringify(data.database)}</p>
			<p>{data.created_at.toString()}</p>
		</div>
	);
}
