import createCompany from 'data/company/create/create';
import { NextResponse } from 'next/server';
import { CompanyInput } from 'types/dto/company';
import { ErrorHandler } from 'utils/errorHandler';

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const data = payload as CompanyInput;
		const result = await createCompany.exec(data);
		return NextResponse.json(result, { status: 201 });
	} catch (err) {
		const responseError = ErrorHandler.create(err);
		return NextResponse.json(responseError, {
			status: responseError.status_code
		});
	}
}
