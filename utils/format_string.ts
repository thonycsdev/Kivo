import { SellingPotential } from '@prisma/client';

function makeSellingPotentialReadable(selling_potential: SellingPotential) {
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

export default Object.freeze({
	makeSellingPotentialReadable
});
