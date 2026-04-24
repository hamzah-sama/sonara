import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
<<<<<<< HEAD
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const isOrgSelectionRoute = createRouteMatcher(["/org-selection(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  await auth.protect();

  if (userId && !orgId && !isOrgSelectionRoute(req)) {
    return NextResponse.redirect(new URL("/org-selection", req.url));
  }

  return NextResponse.next();
=======

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
>>>>>>> 08a485ace8bc8e3c7a5405ece324d829356cacf1
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
