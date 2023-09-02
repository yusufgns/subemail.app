import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export function middleware(request: NextRequest, response: NextResponse) {
  console.log('url', request.url)
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/user/:controller', '/api/v1/:emailController']
}