import { clienteModel } from 'models/clienteModel';
import { NextResponse } from 'next/server';
import { ErrorHandler } from 'utils/errorHandler';

export async function GET() {
	try {
		const result =
			await clienteModel.getAllActiveClientsThatHaventBeenContacted();
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
