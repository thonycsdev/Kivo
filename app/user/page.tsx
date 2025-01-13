'use client';
import {
	Box,
	Button,
	Divider,
	LinearProgress,
	Typography
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSignedUser } from 'app/hooks/useSignedUser';
import UserRowDataMenu from 'app/ui/user-row-data-menu/userRowDataMenu';
import { useState } from 'react';
import CreateCompanyModal from 'app/ui/create-company/createCompanyModal';

export default function UserPage() {
	const { user, signOut } = useSignedUser();
	const [isOpen, setIsOpen] = useState(false);

	if (!user) return <LinearProgress />;
	const handleModalClick = () => {
		setIsOpen((old) => !old);
	};
	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (err) {
			console.log(err);
		} finally {
			return;
		}
	};
	return (
		<>
			<Box
				sx={{
					bgcolor: 'primary.main',
					width: '100%',
					height: '100%',
					position: 'fixed',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<CreateCompanyModal isOpen={isOpen} onClose={handleModalClick} />
				<Box
					width={'750px'}
					minHeight={'fit-content'}
					bgcolor={'white'}
					borderRadius={'10px'}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							m: '40px'
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								height: '10%',
								width: '90%'
							}}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-around',
									alignItems: 'center',
									gap: 2
								}}
							>
								<PersonIcon
									sx={{
										borderRadius: '100%',
										padding: 1,
										width: 80,
										height: 80,
										bgcolor: 'secondary.main',
										color: 'white'
									}}
								/>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column'
									}}
								>
									<Typography variant="h5">{user.name}</Typography>
									<Typography variant="subtitle1" sx={{ opacity: 0.5 }}>
										{user.email}
									</Typography>
								</Box>
							</Box>
							<div onClick={handleSignOut}>
								<LogoutIcon />
							</div>
						</Box>
						<Divider sx={{ width: '90%', mt: '20px' }} />
						<UserRowDataMenu user={user} />
						<Button
							onClick={handleModalClick}
							variant="contained"
							sx={{
								maxWidth: 'fit-content',
								alignSelf: 'start',
								mt: '60px'
							}}
						>
							Criar Nova Empresa
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
}
