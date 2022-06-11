import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const signedinPages = [
  "http://localhost:3000/app",
  "http://localhost:3000/app/home",
  "http://localhost:3000/app/profile",
];

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("/");
    }
  }
}
