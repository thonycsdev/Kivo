import { Box, Divider, Typography } from '@mui/material';
import DataRowTitle from './dataRowTitle';

type props = {
	property: string;
	data: string;
};
export default function DataRow({ property, data }: props) {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					width: '100%'
				}}
			>
				<DataRowTitle propertyTitle={property} />
				<Typography width={'50%'}>{data}</Typography>
			</Box>

			<Divider sx={{ width: '90%', alignSelf: 'center' }} />
		</>
	);
}
