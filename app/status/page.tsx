import { ResponseData } from '../api/v1/status/route';

export default async function Status() {
	const response = await fetch('http://localhost:3000/api/v1/status');
	const data = (await response.json()) as ResponseData;
	return (
		<div>
			<h1>Status</h1>
			<p>{data.message}</p>
			<p>{JSON.stringify(data.database)}</p>
			<p>{data.created_at.toString()}</p>
		</div>
	);
}
