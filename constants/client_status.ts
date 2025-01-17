// eslint-disable-next-line @typescript-eslint/no-unused-vars
const clientStatus = {
	ACTIVE: 'ACTIVE',
	INVACTIVE: 'INACTIVE'
} as const;
type ClientStatus = (typeof clientStatus)[keyof typeof clientStatus];
export default ClientStatus;
