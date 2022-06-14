import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


// we can't use prisma here to go ask for one, so we check for the cookie

//protected pages
const signedinPages = [
  "http://localhost:3000/home",
  "http://localhost:3000/profile",
];

export default function middleware(req) {

  // find the pages, if in those pages you find the same path name it should be protected
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const {AUDIT_ACCESS_TOKEN :token} = req.cookies;

    // if no token, redirect to signin
    if (!token) {
      return NextResponse.redirect("http://localhost:3000/signup");
    }
  }
}
