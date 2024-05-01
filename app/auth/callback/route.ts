import { scalekit } from '@/service/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const isDev = process.env.NODE_ENV == 'development';
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({
      success: false,
      message: "Invalid request"
    })
  }
  const state = request.cookies.get("state")?.value;
  try {
    // Validate state to prevent CSRF attacks
    if (state !== request.nextUrl.searchParams.get("state")) {
      return NextResponse.json({
        success: false,
        message: "Invalid request"
      })
    }
    request.cookies.delete("state");
    const { user, accessToken } = await scalekit.authenticateWithCode({
      redirectUri: process.env.AUTH_REDIRECT_URI!,
      code: code
    })
    const url = request.nextUrl.clone();
    url.searchParams.delete("code");
    url.pathname = "/me";
    const response = NextResponse.redirect(url);
    response.cookies.set({
      name: "user",
      value: JSON.stringify(user),
      httpOnly: true,
      ...(!isDev && { secure: true })
    });
    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      ...(!isDev && { secure: true })
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error
    })
  }
}