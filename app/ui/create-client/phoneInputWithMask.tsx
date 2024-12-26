/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material';
import { forwardRef, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import format_string from 'utils/format_string';
import string_validation from 'utils/string_validation';

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
	function TextMaskCustom(props, ref) {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask="(00) 00000-0000"
				inputRef={ref}
				onAccept={(value: any) =>
					onChange({ target: { name: props.name, value } })
				}
				overwrite
			/>
		);
	}
);
type props = {
	register: any;
};
export default function PhoneInputWithMask({ register }: props) {
	const maskInput = useRef<HTMLInputElement>();
	return (
		<Controller
			control={register}
			name="personalPhoneNumber"
			render={({ field }) => (
				<TextField
					{...field}
					fullWidth
					label="Telefone Pessoal"
					slotProps={{
						input: {
							inputComponent: TextMaskCustom as any,
							inputRef: maskInput
						}
					}}
					required
					onChange={(e) => {
						const personalPhoneNumber = e.target.value;
						if (string_validation.phoneNumber(personalPhoneNumber)) {
							const phoneNumberWithoutPontuation =
								format_string.removePhoneNumberPontuation(personalPhoneNumber);
							field.onChange(phoneNumberWithoutPontuation);
						}
					}}
				/>
			)}
		/>
	);
}
