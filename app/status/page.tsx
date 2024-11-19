import UrlManager from '../../utils/urlManager';
import { ResponseData } from '../api/v1/status/route';

export default async function Status() {
	const urlManager = UrlManager.create();
	urlManager.addPathName('/api/v1/status');
	const response = await fetch(urlManager.getUrlObject());
	const data = (await response.json()) as ResponseData;
	return (
		<div>
			<h1>Status</h1>
			<p>{data.message}</p>
			<p>database: {JSON.stringify(data.database)}</p>
			<p>{data.created_at.toString()}</p>
		</div>
	);
}
