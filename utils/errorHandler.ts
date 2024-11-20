export class ErrorHandler extends Error {
	status_code: number;
	stack: string;
	name: string;
	created_at: Date;
	solution: string;

	private constructor() {
		super();
		this.solution = 'no treated solution provided';
		this.created_at = new Date();
	}
	addSolution(solution: string): void {
		this.solution = solution;
	}
	static create(error: Error, status_code: number = 500): ErrorHandler {
		const errorHandler = new ErrorHandler();
		errorHandler.status_code = status_code;
		errorHandler.name = error.name;
		errorHandler.stack = error.stack;
		errorHandler.message = error.message;
		return errorHandler;
	}
}
