import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  created_at: Date;
  message: string;
};
export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const responseData = { created_at: new Date(), message: "SERVER_OK" };
  res.status(200).json(responseData);
}
