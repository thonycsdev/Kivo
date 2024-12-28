'use client';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { closeCookieSession } from 'models/cookies';
import { redirect } from 'next/navigation';

type NavbarItem = {
	label: string;
	href: string;
};
const navbarItems: NavbarItem[] = [
	{ label: 'Início', href: '/crm' },
	{ label: 'Clientes', href: '/crm/clientes' },
	{ label: 'Vendas', href: '/crm/vendas' },
	{ label: 'Redes', href: '/crm/redes' },
	{ label: 'Emails', href: '/crm/emails' }
];

const userMenuOptions = [{ label: 'Sair', action: closeCookieSession }]; //oi

async function handleMenuOptionClick(action: () => Promise<void>) {
	await action();
	redirect('/conta/acesso');
}

export default function Navbar() {
	const [ancoraDoMenu, setAncoraDoMenu] = useState<null | HTMLElement>();
	const handleUserProfileClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setAncoraDoMenu(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAncoraDoMenu(null);
	};
	return (
		<AppBar position="sticky">
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%'
					}}
				>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						<Image
							height={50}
							width={50}
							src={'/logo-praja.png'}
							alt="logo-praja"
						/>
					</Typography>
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{navbarItems.map((item) => (
							<Link href={item.href} key={item.label}>
								<Button sx={{ color: 'white' }}>{item.label}</Button>
							</Link>
						))}
					</Box>
					<Box sx={{ display: 'flex' }}>
						<Tooltip title="Menu do Usuário">
							<IconButton sx={{ p: 0 }} onClick={handleUserProfileClick}>
								<AccountCircleIcon fontSize="large" sx={{ color: 'white' }} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={ancoraDoMenu}
							keepMounted
							onClose={handleCloseMenu}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={ancoraDoMenu != null}
						>
							{userMenuOptions.map((opt) => (
								<MenuItem
									key={opt.label}
									onClick={() => handleMenuOptionClick(opt.action)}
								>
									<Typography sx={{ textAlign: 'center' }}>
										{opt.label}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
