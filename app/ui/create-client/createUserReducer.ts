import { Prisma } from '@prisma/client';

export type CreateUserAction = {
	type: EnumCreateUserReducerActions;
	payload: string;
};

export enum EnumCreateUserReducerActions {
	name = 'name'
}
export default function createUserReducer(
	state: Prisma.ClienteCreateInput,
	action: CreateUserAction
) {
	const { type, payload } = action;
	switch (type) {
		case EnumCreateUserReducerActions.name:
			return { ...state, name: payload };
		default:
			return;
	}
}
