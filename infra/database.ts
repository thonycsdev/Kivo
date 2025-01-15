import { Client, ClientConfig, QueryConfig } from 'pg';

async function query<T>(queryObject: QueryConfig) {
	const client = await getNewClient();
	try {
		const result = await client.query<T>(queryObject);
		return result;
	} catch (error) {
		console.error(error);
	} finally {
		await client.end();
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
function getClosedClient() {
	const config: ClientConfig = {
		host: process.env.POSTGRES_HOST,
		port: +process.env.POSTGRES_PORT,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		ssl: getSSLValues()
	};

	const client = new Client(config);
	return client;
}

function getSSLValues() {
	return process.env.NODE_ENV == 'production';
}

export default Object.freeze({ query, getNewClient, getClosedClient });
