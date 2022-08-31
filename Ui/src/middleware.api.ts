import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse {
	const { origin, pathname } = req.nextUrl;

	if (pathname === '/') {
		return NextResponse.redirect(`${origin}/listings`);
	}

	return NextResponse.next();
}
