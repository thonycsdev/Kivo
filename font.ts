import localFont from 'next/font/local';
import { Exo_2 } from 'next/font/google';
const hoglar = localFont({
	src: './public/Hoglar.ttf',
	variable: '--hoglar',
	display: 'swap'
});

const exo_2 = Exo_2({
	variable: '--exo-2',
	subsets: ['latin'],
	weight: '400'
});

const fonts = {
	hoglar,
	exo_2
};
export default fonts;
