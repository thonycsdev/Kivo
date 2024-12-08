"use client"

import Grid from "@mui/material/Grid2";
import { Box, Paper, styled } from "@mui/material";

export default function Acessar() {
	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		...theme.applyStyles('dark', {
			backgroundColor: '#1A2027',
		}),
	}));
	return (

		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid size={8}>
					<Item>size=8</Item>
				</Grid>
				<Grid size={4}>
					<Item>size=4</Item>
				</Grid>
				<Grid size={4}>
					<Item>size=4</Item>
				</Grid>
				<Grid size={8}>
					<Item>size=8</Item>
				</Grid>
			</Grid>
		</Box>
	);
}
