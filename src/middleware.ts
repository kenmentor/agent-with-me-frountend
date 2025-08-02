import { NextRequest, NextResponse } from "next/server"
const publicRoute = ["/Login", "/Signup", "/verify-email"]
const privateRoute = ["/profile", "/users", "/upload"]
export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value
    console.log(token)
    const { pathname } = request.nextUrl

    console.log(request.cookies)

    if (!token && privateRoute.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/Login", request.url))
    }
    if (token && publicRoute.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/homepage", request.url))
    }
    console.log("hellooe")

    return NextResponse.next()
}
export const config = {
    matcher: ["/upload:path*", "/profile:path*", "/Login:path*", "/Signup:path*", "/verify-email"]
}