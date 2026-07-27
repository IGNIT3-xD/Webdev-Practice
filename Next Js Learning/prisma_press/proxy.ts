import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { getRefreshToken } from './service/refreshToken';

const AUTH_ROUTES = ['/auth/login', '/auth/registration']
const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/registration', '/posts']

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    // console.log(pathname);
    const cookieStore = await cookies()

    let accessToken = request.cookies.get('accessToken')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value

    // const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null
    const decodedToken = accessToken ? jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload : null
    const decodedRefreshToken = refreshToken ? jwt.decode(refreshToken) as JwtPayload : null
    // console.log(decodedToken);

    let userRole = null

    if (!decodedToken && decodedRefreshToken) {
        const result = await getRefreshToken()

        if (result.success) {
            const newToken = result.data.accessToken

            cookieStore.set("refreshToken", newToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: 'lax'
            })

            accessToken = newToken
        }
    }

    if (!decodedToken) {
        cookieStore.delete("accessToken")
    }

    if (decodedToken) {
        userRole = decodedToken.role
    }

    // Can't access auth page if logged in
    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        }
        else if (userRole === 'AUTHOR') {
            return NextResponse.redirect(new URL('/author-dashboard', request.url))
        }
        else if (userRole === 'USER') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    // Private routes authorization
    const isPublic = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
    if (!isPublic && !accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (pathname.startsWith('/dashboard') && userRole !== "USER") {
        return NextResponse.redirect(new URL('/', request.url))
    }
    else if (pathname.startsWith('/admin-dashboard') && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/', request.url))
    }
    else if (pathname.startsWith('/author-dashboard') && userRole !== "AUTHOR") {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next()
}

export const config = {
    // matcher: '/about/:path*',

    matcher: [
        // '/about/:path*', '/dashboard/:path*'
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
    ],
}