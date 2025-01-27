import SellingPotention from 'constants/selling_potention';

function makeSellingPotentialReadable(selling_potential: SellingPotention) {
	switch (selling_potential) {
		case 'EmNegociacao':
			return 'Em Negociação';
		case 'AltaProbabilidade':
			return 'Alta Probabilidade';
		case 'ContratoAssinado':
			return 'Contrato Assinado';
		default:
			return selling_potential;
	}
}

function addCPFPontuation(cpf: string) {
	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
function removeCPFPontuation(cpf: string) {
	return cpf.replace(/[^\d]+/g, '');
}

function removePhoneNumberPontuation(phoneNumber: string) {
	return phoneNumber
		.replace('(', '')
		.replace(')', '')
		.replace('-', '')
		.replace(' ', '');
}

function emailFormatting(emailFormatting: string) {
	const email = emailFormatting.toLocaleLowerCase();
	return email;
}

function toLowerCase(toLowerCase: string) {
	const upperString = toLowerCase.toLocaleLowerCase();
	return upperString;
}

export default Object.freeze({
	makeSellingPotentialReadable,
	addCPFPontuation,
	removeCPFPontuation,
	removePhoneNumberPontuation,
	emailFormatting,
	toLowerCase
});
