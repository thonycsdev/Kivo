import { Box, Divider, Grid2 } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import UserRowDataMenu from 'app/ui/user-row-data-menu/userRowDataMenu';

export default function UserPage() {
	return (
		<>
			<Box
				sx={{
					bgcolor: 'primary.main',
					width: '100vw',
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Box
					width={'50%'}
					height={'70%'}
					bgcolor={'white'}
					borderRadius={'10px'}
				>
					<Grid2>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								height: '10%',
								mt: '50px',
								mx: '45px'
							}}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-around',
									alignItems: 'center',
									height: '10%',
									gap: 4
								}}
							>
								<PersonIcon sx={{ width: 60, height: 60 }} />
								<Box>
									<p>Name</p>
									<p>email@email.com</p>
								</Box>
							</Box>
							<LogoutIcon sx={{ mb: 10 }} />
						</Box>
						<Divider />
						<UserRowDataMenu />
					</Grid2>
				</Box>
			</Box>
		</>
	);
}
