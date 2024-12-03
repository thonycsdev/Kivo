async function fetcher(key: string) {
	const response = await fetch(key);
	const responseData = await response.json();
	return responseData;
}

export default fetcher;
