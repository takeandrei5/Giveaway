import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	const { pathname } = req.nextUrl;
	if (pathname === '/') {
		return NextResponse.redirect(`${process.env.BASE_URL}/listings`);
	}

	return NextResponse.next();
}
