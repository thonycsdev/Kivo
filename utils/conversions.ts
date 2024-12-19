function enumToArray<T extends object>(inputEnum: T): string[] {
	return Object.keys(inputEnum).filter((k) => isNaN(Number(k)));
}

export default Object.freeze({ enumToArray });
