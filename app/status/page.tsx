'use client';
import { ResponseData } from 'app/api/v1/status/route';
import keys from 'constants/keys';
import useSWR from 'swr';
import styles from './page.module.css';
import apiMethods from 'infra/apiMethods';

export default function Status() {
	const { data, isLoading } = useSWR<ResponseData>(
		keys.status,
		apiMethods.fetch
	);
	if (isLoading) return <p>Loading...</p>;
	return (
		<div className={styles.container}>
			<h1>Status</h1>
			<p>{data.message}</p>
			<p>database: {JSON.stringify(data.database)}</p>
			<p>{data.created_at.toString()}</p>
		</div>
	);
}
