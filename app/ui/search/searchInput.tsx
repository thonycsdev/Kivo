import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

type props = {
	onSearch: (searchTerm: string) => void;
	onClearSearch: () => void;
};
export default function SearchInput({ onSearch, onClearSearch }: props) {
	const [searchTerm, setSearchTerm] = useState('');
	const [isDisable, setIsDisable] = useState(true);
	useEffect(() => {
		if (searchTerm.length >= 3) {
			setIsDisable(false);
		} else {
			setIsDisable(true);
		}
	}, [searchTerm]);

	const handleOnClearSearch = () => {
		setSearchTerm('');
		onClearSearch();
	};
	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
				<TextField
					id="outlined-required"
					sx={{ width: '70%' }}
					label="Nome"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button
					disabled={isDisable}
					onClick={() => onSearch(searchTerm)}
					variant="contained"
				>
					Buscar
				</Button>
				<Button
					disabled={isDisable}
					onClick={handleOnClearSearch}
					variant="outlined"
				>
					Limpar Busca
				</Button>
			</Box>
		</>
	);
}
