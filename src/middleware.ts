import { type AuthSession, fetchAuthSession } from "aws-amplify/auth";
import { type NextRequest, NextResponse } from "next/server";

// Define the paths that require authentication
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  console.log(pathname);

  // Simulate an authentication check (replace with actual authentication logic)
  let session: AuthSession | undefined;
  try {
    session = await fetchAuthSession();
  } catch (e) {}

  // If the user is trying to access a protected route and is not authenticated, redirect to login
  if (session?.credentials === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
};

export const config = {
  matcher: "/home",
};
