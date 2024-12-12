import admin from 'models/admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const payload = await request.json();
	const result = admin.verifyAdmin(payload.passwd);
	return NextResponse.json(result, { status: 200 });
}
