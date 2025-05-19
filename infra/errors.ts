class BaseError extends Error {
	status_code: number;
	action: Error | string;
	message: string;
	constructor(error: Error) {
		super(error.message, { cause: error });
	}

	toJSON() {
		return {
			message: this.message,
			name: this.name,
			status_code: this.status_code,
			action: this.action
		};
	}
}

export class InvalidInput extends BaseError {
	constructor(error: Error | string) {
		super(error instanceof Error ? error : new Error(error));
		this.status_code = 400;
		this.name = 'Invalid Input Error';
	}
}
