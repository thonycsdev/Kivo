function addSellingPotential(client: Prisma.ClienteCreateInput) {
	if (client.hasFGTS) {
		client.sellingPotentialTag = SellingPotential.AltaProbabilidade;
		return;
	}
	client.sellingPotentialTag = SellingPotential.Interessado;
}
export default Object.freeze({ addSellingPotential });
