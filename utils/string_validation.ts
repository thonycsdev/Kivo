import format_string from './format_string';

function CPF(cpf: string): boolean {
	cpf = format_string.removeCPFPontuation(cpf);
	if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
		return false; // Rejeita CPF com todos os digitos iguais
	}

	const base = cpf.slice(0, 9);
	const first_digit = calculateDigit(base, 10);
	const second_digit = calculateDigit(base + first_digit, 11);
	return cpf === base + first_digit + second_digit;
}

function calculateDigit(base: string, initial: number): string {
	let soma = 0;
	for (let i = 0; i < base.length; i++) {
		soma += parseInt(base[i]) * (initial - i);
	}
	const resto = soma % 11;
	const result = resto < 2 ? 0 : 11 - resto;
	return result.toString();
}

function phoneNumber(phoneNumber: string) {
	phoneNumber = format_string.removePhoneNumberPontuation(phoneNumber);

	if (phoneNumber.length !== 11 || /^(\d)\1+$/.test(phoneNumber)) {
		return false; //retorna false se o tamanho for diferente de 11, e se todos os numeros forem iguais
	}

	return true;
}
export default Object.freeze({ CPF, phoneNumber });
