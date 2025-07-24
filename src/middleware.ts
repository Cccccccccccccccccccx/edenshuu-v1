import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Liste des chemins protégés
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/projects',
  '/admin'
]

// Liste des chemins d'authentification
const authPaths = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  // Récupérer le token de session
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  // Rediriger les utilisateurs authentifiés qui essaient d'accéder aux pages d'authentification
  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Rediriger les utilisateurs non authentifiés qui essaient d'accéder aux pages protégées
  if (!isAuthenticated && isProtectedPath) {
    // Stocker l'URL demandée pour redirection après connexion
    const callbackUrl = pathname + (request.nextUrl.search || '')
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', callbackUrl)
    
    return NextResponse.redirect(signInUrl)
  }

  // Vérifier les rôles pour les routes admin
  if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
