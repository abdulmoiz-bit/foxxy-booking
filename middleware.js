/*import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url));
}*/

//import { auth } from "@/app/_services/auth";

import { auth } from "@/app/api/auth/[...nextauth]/route";
export const middleware = auth;

export const config = {
  matcher: [],
  //matcher:["/account"]
};


