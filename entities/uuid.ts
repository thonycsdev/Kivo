import { v4 } from 'uuid';
export class UUID {
	protected readonly id: string;
	constructor() {
		this.id = this.generateUUID();
	}
	private generateUUID() {
		return v4();
	}

	getID() {
		return this.id;
	}
}
