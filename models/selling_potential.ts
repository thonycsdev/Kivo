import { sellingPotential } from 'constants/selling_potention';
import { ClientRequest } from 'types/dto/client';

function addSellingPotential(client: ClientRequest) {
	if (client.hasFGTS) {
		client.sellingPotentialTag = sellingPotential.AltaProbabilidade;
		return;
	}
	client.sellingPotentialTag = sellingPotential.interessado;
}
export default Object.freeze({ addSellingPotential });
