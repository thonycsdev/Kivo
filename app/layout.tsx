'use client';
import styles from 'variables.module.scss';
import fonts from 'font';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from 'styles/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${fonts.exo_2.variable} ${fonts.hoglar.variable}`}
		>
			<link rel="icon" href="/logo-praja.png" sizes="any" />
			<meta name="viewport" content="initial-scale=1, width=device-width" />
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<body className={styles.app}>{children}</body>
				</LocalizationProvider>
			</ThemeProvider>
		</html>
	);
}
