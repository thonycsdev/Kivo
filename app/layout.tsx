"use client"
import styles from 'variables.module.scss';
import fonts from 'font';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from 'styles/theme';

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
			<meta name="viewport" content="initial-scale=1, width=device-width" />
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<body className={styles.app}>
					{children}
				</body>
			</ThemeProvider>
		</html>
	);
}
