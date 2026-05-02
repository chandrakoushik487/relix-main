import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('firebase-token')?.value;
  const { pathname } = request.nextUrl;

  // Protected routes start with (protected) in the folder structure 
  // but they appear as /dashboard, /volunteer, etc. in the URL.
  // We need to define which URL paths are protected.
  const protectedPaths = ['/dashboard', '/volunteer', '/analytics', '/incident-feed', '/emergency-map', '/data-lake', '/tasks', '/impact', '/profile', '/settings'];
  
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAuthPage = pathname === '/login';

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && token) {
    // If logged in, redirect to dashboard (we'll let the layout handle role-based specific redirect)
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
