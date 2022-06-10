import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const signedinPages = ['http://localhost:3000/hi']

export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (!token) {
      return NextResponse.redirect('http://localhost:3000/')
    }
  }
}
