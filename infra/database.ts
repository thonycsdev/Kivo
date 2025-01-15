import { Client, ClientConfig, QueryConfig, QueryConfigValues } from 'pg';

async function query(queryObject: QueryConfig) {
	const client = await getNewClient();
	try {
		var result = await client.query(queryObject);
		return result;
	} catch (error) {
		console.error(error);
	} finally {
		client.end();
	}
}

async function getNewClient() {
	const config: ClientConfig = {
		host: process.env.POSTGRES_HOST,
		port: +process.env.POSTGRES_PORT,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		ssl: getSSLValues()
	};

	const client = new Client(config);
	await client.connect();
	return client;
}

function getSSLValues() {
	return process.env.NODE_ENV == 'production';
}

export default Object.freeze({ query });
