import { Credential } from 'types/credential';

async function makeGetRequest(key: string) {
	const response = await makeGetRequest(key);
	const responseData = await response.json();
	return responseData;
}

async function makeSignInRequest(key: string, { arg }: { arg: Credential }) {
	const response = await fetch(key, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(arg)
	});
	if (!response.ok) {
		throw await response.json();
	}
	const responseData = await response.json();
	return responseData;
}

async function post<T>(key: string, { arg }: { arg: T }) {
	const payload = JSON.stringify(arg);
	const r = await fetch(key, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: payload
	});

	const result = await r.json();
	if (!r.ok) {
		throw result.solution;
	}
	return result as T;
}

const api = {
	makeGetRequest,
	makeSignInRequest,
	post
};
export default api;
