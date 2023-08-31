import { NextResponse } from "next/server";

export function middleware() {
    const res = NextResponse.next()

    res.headers.append('Access-Control-Allow-Origin', 'https://submails.vercel.app')

    return res

    return res
}

// specify the path regex to apply the middleware to
export const config = {
    matcher: '/pages/api/subscriber_email',
}