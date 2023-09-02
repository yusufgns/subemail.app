import { NextResponse,NextRequest } from 'next/server'
const isUserRouter = (pathname:string) => {
  return pathname.startsWith('/api/users')
}

export function authMiddleware(request: NextRequest, response: NextResponse) {
  console.log('request', request)
  console.log('response', response)
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
