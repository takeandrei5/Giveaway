import { NextURL } from 'next/dist/server/web/next-url';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent): Promise<NextResponse> {
	const { pathname } = req.nextUrl;
	if (pathname === '/') {
		return NextResponse.redirect(`${process.env.BASE_URL}/listings`);
	}

	return NextResponse.next();
}
