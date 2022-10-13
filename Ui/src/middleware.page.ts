import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse {
	const { origin, pathname } = req.nextUrl;

	console.log(pathname, origin);

	if (pathname === '/') {
		return NextResponse.redirect(`${origin}/listings`);
	}

	return NextResponse.next();
}
