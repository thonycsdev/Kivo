import { createTheme } from '@mui/material';
import fonts from 'font';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#2b579e'
		},
		secondary: {
			main: '#4b514f'
		}
	},
	typography: {
		fontFamily: [fonts.hoglar, fonts.exo_2].join(',')
	}
});
