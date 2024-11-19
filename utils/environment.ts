function isProductionEnvironment() {
	const environment = getEnvironment();
	return environment === 'production';
}

function getBaseUrl() {
	const baseUrl = process.env.VERCEL_URL;
	const environment = getEnvironment();
	if (!baseUrl)
		throw new Error(`-> VERCEL_URL is not defined in ${environment}`);

	return baseUrl;
}

function getEnvironment() {
	const environment = process.env.NODE_ENV;
	if (!environment) throw new Error('-> NODE_ENV is not defined');
	return environment;
}

const environment = { isProductionEnvironment, getBaseUrl, getEnvironment };
export default environment;
