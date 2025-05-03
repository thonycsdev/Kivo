import { createTheme } from '@mui/material';
import fonts from 'font';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#181916'
		},
		secondary: {
			main: '#ddddd7'
		}
	},
	typography: {
		fontFamily: [fonts.hoglar, fonts.exo_2].join(',')
	}
});
