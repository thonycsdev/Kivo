import { Navbar } from './ui/navbar/navbar';
import styles from 'variables.module.scss';
import fonts from 'font';

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
			<body className={styles.app}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
