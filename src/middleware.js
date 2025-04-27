import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  
  const authPaths = ['/login', '/register', '/verify'];
  const publicPaths = ['/'];

  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith(`${path}/`)
  );
  
  const isAuthPath = authPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith(`${path}/`)
  );
  
  if (!token && !isPublicPath && !isAuthPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/app', request.url));
  }
  
  return NextResponse.next();
}

// Define which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
