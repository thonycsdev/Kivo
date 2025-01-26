// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sellingPotential = {
	interessado: 'Interessado',
	EmNegociacao: 'EmNegociacao',
	AltaProbabilidade: 'AltaProbabilidade',
	Perdido: 'Perdido',
	ContratoAssinado: 'ContratoAssinado'
} as const;
type SellingPotention =
	(typeof sellingPotential)[keyof typeof sellingPotential];
export default SellingPotention;
