import { Box } from '@mui/material';

type props = {
	property: string;
	data: string;
};
export default function DataRow({ property, data }: props) {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-around'
			}}
		>
			<p>{property}</p>
			<p>{data}</p>
		</Box>
	);
}
