function verifyAdmin(password: string) {
	console.log(process.env.ADMIN_PASSWD);
	return password === process.env.ADMIN_PASSWD;
}

export default Object.freeze({ verifyAdmin });
