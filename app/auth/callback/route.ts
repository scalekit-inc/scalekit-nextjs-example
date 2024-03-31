import { scalekit } from '@/service/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    if (!code) {
        return NextResponse.json({
            success: false,
            message: "Invalid request"
        })
    }
    try {
        const { user, accessToken } = await scalekit.authenticateWithCode({
            redirectUri: process.env.AUTH_REDIRECT_URI!,
            code: code
        })
        const url = request.nextUrl.clone();
        url.searchParams.delete("code");
        // verification of state
        url.pathname = "/me";
        const response = NextResponse.redirect(url);
        response.cookies.set({
            name: "user",
            value: JSON.stringify(user),
            httpOnly: true
        });
        response.cookies.set({
            name: "accessToken",
            value: accessToken,
            httpOnly: true
        });
        return response;
    } catch (error) {

        return NextResponse.json({
            success: false,
            error: error
        })
    }
}