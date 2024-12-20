function hasCreatedThisMonth(createdAtFromClient: string): boolean {
	const currentMonth = new Date().getMonth();
	const createdDate = new Date(createdAtFromClient);
	const createdMonth = createdDate.getMonth();
	return createdMonth === currentMonth;
}

export default Object.freeze({ hasCreatedThisMonth: hasCreatedThisMonth });
