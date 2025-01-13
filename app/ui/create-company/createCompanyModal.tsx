import {
	Modal,
	Box,
	Typography,
	TextField,
	Button,
	CircularProgress
} from '@mui/material';
import { useSignedUser } from 'app/hooks/useSignedUser';
import api from 'infra/api';
import { useForm } from 'react-hook-form';
import { CompanyInput } from 'types/dto/company';

import useSWRMutation from 'swr/mutation';

type props = {
	isOpen: boolean;
	onClose: () => void;
};
export default function CreateCompanyModal({
	isOpen,
	onClose: handleClose
}: props) {
	const { register, handleSubmit } = useForm();
	const { user } = useSignedUser();
	const { trigger, isMutating } = useSWRMutation(
		'/api/v1/company',
		api.post<CompanyInput>
	);
	const submitFunction = async (data: CompanyInput) => {
		if (!user) console.log('Usuario nao logado');
		data.user_id = user.id;
		await trigger(data);
	};
	return (
		<Modal open={isOpen} onClose={handleClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'whitesmoke',
					width: '400px',
					boxShadow: 24
				}}
			>
				<form onSubmit={handleSubmit(submitFunction)}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 3,
							p: 5,
							height: '100%',
							width: '100%',
							flexDirection: 'column'
						}}
					>
						<Typography variant="h6">Criação de Empresa</Typography>
						<TextField
							{...register('name')}
							fullWidth
							id="outlined-basic"
							label="Nome da Empresa"
							type="text"
							variant="outlined"
						/>
						<Button
							type="submit"
							sx={{ alignSelf: 'start' }}
							variant="contained"
						>
							Cadastrar
						</Button>
						{isMutating && (
							<CircularProgress
								sx={{
									marginTop: 2
								}}
							/>
						)}
					</Box>
				</form>
			</Box>
		</Modal>
	);
}
