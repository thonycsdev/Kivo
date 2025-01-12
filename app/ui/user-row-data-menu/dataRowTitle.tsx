import { Typography } from '@mui/material';

type props = {
	propertyTitle: string;
};
export default function DataRowTitle({ propertyTitle }: props) {
	return (
		<>
			<Typography fontSize={16} fontWeight={'bold'} width={'50%'} ml={'20%'}>
				{propertyTitle}
			</Typography>
		</>
	);
}
