import { theme } from 'styles/theme';
import Swal from 'sweetalert2';

type alertsInputs = {
	title: string;
	text: string;
	confirmButtonText: string;
};

async function successAlert(data: alertsInputs) {
	return await Swal.fire({
		title: data.title,
		text: data.text,
		icon: 'success',
		confirmButtonText: data.confirmButtonText,
		confirmButtonColor: theme.palette.primary.main
	});
}

async function errorAlert(data: alertsInputs, errorMessage: string) {
	await Swal.fire({
		title: data.title,
		text: data.text,
		icon: 'error',
		footer: errorMessage,
		confirmButtonText: data.confirmButtonText,
		confirmButtonColor: theme.palette.primary.main
	});
}

export default Object.freeze({ successAlert, errorAlert });
