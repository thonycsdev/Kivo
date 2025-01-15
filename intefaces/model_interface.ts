export interface IModel<Input, Output> {
	execute(input: Input): Promise<Output>;
}
