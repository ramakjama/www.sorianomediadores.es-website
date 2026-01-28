import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Rutas que requieren autenticacion
const protectedRoutes = [
  '/area-cliente',
  '/dashboard',
  '/polizas',
  '/siniestros',
  '/documentos',
  '/pagos',
  '/perfil',
  '/mensajes',
  '/soriano-club',
]

// Rutas solo para empleados y admins
const employeeRoutes = [
  '/admin',
  '/gestion',
]

// Rutas solo para admins
const adminRoutes = [
  '/admin/usuarios',
  '/admin/configuracion',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isEmployeeRoute = employeeRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute || isEmployeeRoute || isAdminRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // No token - redirect to login
    if (!token) {
      const loginUrl = new URL('/acceso-clientes', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check employee routes
    if (isEmployeeRoute) {
      if (token.role !== 'EMPLEADO' && token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/area-cliente', request.url))
      }
    }

    // Check admin routes
    if (isAdminRoute) {
      if (token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/area-cliente', request.url))
      }
    }
  }

  // Redirect logged users away from login pages
  const authPages = ['/acceso-clientes', '/acceso-empleados']
  if (authPages.some(page => pathname.startsWith(page))) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (token) {
      // Redirect based on role
      if (token.role === 'ADMIN' || token.role === 'EMPLEADO') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return NextResponse.redirect(new URL('/area-cliente', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - static files
     * - images
     * - favicon
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}
