function verifyAdmin(password: string) {
	return password === process.env.ADMIN_PASSWD;
}

export default Object.freeze({ verifyAdmin });
