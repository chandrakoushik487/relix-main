import { NextResponse } from 'next/server';

/**
 * Proxy function for Relix platform.
 * Satisfies the requirement for a 'proxy' export in newer Next.js environments.
 */
export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  const isProtectedRoute = pathname.startsWith('/dashboard') ||
                           pathname.startsWith('/emergency-map') ||
                           pathname.startsWith('/data-lake') ||
                           pathname.startsWith('/incident-feed');

  // RBAC logic example for /data-lake (Placeholder for Firebase Session Cookies)
  /*
  if (pathname.startsWith('/data-lake')) {
      const session = request.cookies.get('__session');
      if (!session) {
          const url = request.nextUrl.clone();
          url.pathname = '/login';
          return NextResponse.redirect(url);
      }
  }
  */

  // Redirect authenticated users away from '/' or '/login' back to dashboard
  /*
  if (pathname === '/' || pathname === '/login') {
    const session = request.cookies.get('__session');
    if (session) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
