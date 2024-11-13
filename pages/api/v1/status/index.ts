import { NextApiRequest, NextApiResponse } from 'next';
import statusModel from '../../../../models/statusModel';

export type ResponseData = {
	created_at: Date;
	message: string;
	database: {
		version: string;
		max_connections: number;
		active_connections: number;
	};
};
export default async function handler(
	_: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const responseData = await statusModel.buildStatusResponse();
	if (responseData.message === 'SERVER_ERROR') {
		res.status(500).json(responseData);
	}
	res.status(200).json(responseData);
}
