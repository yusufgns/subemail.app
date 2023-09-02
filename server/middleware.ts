import { NextResponse, NextRequest } from 'next/server'
const isUserRouter = (pathname: string) => {
  return pathname.startsWith('/api/users')
}

export function authMiddleware(request: NextRequest, response: NextResponse) {
  return NextResponse.redirect(new URL('/fkmdkfmkfmldg'))
}

export const config = {
  matcher: ['/api/user/:path*', '/api/v1/:path*'],
}
