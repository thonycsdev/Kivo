import UrlManager from '../../utils/urlManager';
import { ResponseData } from '../api/v1/status/route';

export default async function Status() {
	const urlManager = UrlManager.create();
	urlManager.addPathName('/api/v1/status');
	const url = urlManager.getUrlObject();
	const response = await fetch(url);
	const responseData = await response.json();
	const data = responseData as ResponseData;
	return (
		<div>
			<h1>Status</h1>
			<p>{data.message}</p>
			<p>database: {JSON.stringify(data.database)}</p>
			<p>{data.created_at.toString()}</p>
		</div>
	);
}
