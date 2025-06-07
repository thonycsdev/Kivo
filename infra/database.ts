import { Client, ClientConfig, QueryConfig } from 'pg';

const config: ClientConfig = {
	host: process.env.POSTGRES_HOST,
	port: +process.env.POSTGRES_PORT,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	ssl: getSSLValues()
};

function getSSLValues() {
	return process.env.NODE_ENV == 'production';
}

function getClient() {
	const client = new Client(config);
	return client;
}

async function query(queryObject: QueryConfig) {
	const client = getClient();
	try {
		await client.connect();
		const result = await client.query(queryObject);
		return result;
	} catch (error) {
		console.error(error);
	} finally {
		await client.end();
	}
}

const database = {
	query,
	getClient
};
export default Object.freeze(database);
