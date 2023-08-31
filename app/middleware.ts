import { NextResponse } from "next/server";

export function middleware() {
    const res = NextResponse.next()

    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')

    return res
}

// specify the path regex to apply the middleware to
export const config = {
    matcher: '/pages/api/subscriber_email',
}