'use client';
import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LoginForm from 'app/ui/login-form/loginForm';
import Image from 'next/image';

export default function Acessar() {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
		>
			<Grid
				container
				width="1200px"
				height="800px"
				alignItems="center"
				borderRadius={'16px'}
			>
				<Container
					sx={{
						display: 'flex',
						justifyContent: 'center',
						width: '50%',
						height: '100%',
						bgcolor: 'primary.main',
						alignItems: 'center'
					}}
				>
					<Image
						height={200}
						width={200}
						src={'/logo-praja.png'}
						alt="praja-logo"
					/>
				</Container>
				<Grid width={'50%'} height={'100%'}>
					<LoginForm />
				</Grid>
			</Grid>
		</Box>
	);
}
