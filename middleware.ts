import { getUser } from '@/service/auth'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const user = request.cookies.get("user")?.value;

  if(request.nextUrl.pathname.startsWith('/logout')){
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete("user");
    response.cookies.delete("accessToken");
    return response;
  }

  if (user && !request.nextUrl.pathname.startsWith('/me')) {
    return Response.redirect(new URL('/me', request.url))
  }

  if (!user && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|auth/callback|_next/static|_next/image|.*\\.png$).*)'],
}