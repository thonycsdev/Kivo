// eslint-disable-next-line @typescript-eslint/no-unused-vars
const communication = {
	whatsapp: 'Whatsapp',
	chamada: 'Chamada'
};

type MeansOfCommunication = (typeof communication)[keyof typeof communication];
export default MeansOfCommunication;
