import { Navbar } from './ui/navbar/navbar';
import { Nunito } from 'next/font/google';

const font = Nunito({
	subsets: ['latin'],
	display: 'swap'
});

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={font.className}>
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
