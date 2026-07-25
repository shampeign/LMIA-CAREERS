import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ClerkAuthProvider } from "~/providers/clerk";

import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title:
          "LMIA Career AI — Find Canadian Employers Who Are Hiring",
      },
      {
        name: "description",
        content:
          "Discover Canadian employers with TFWP hiring history, get AI-matched to jobs, optimize your resume, and land your dream job in Canada.",
      },
      { name: "theme-color", content: "#2563EB" },
      {
        property: "og:title",
        content: "LMIA Career AI — Find Canadian Employers Who Are Hiring",
      },
      {
        property: "og:description",
        content:
          "Discover Canadian employers with TFWP hiring history, get AI-matched to jobs, optimize your resume, and land your dream job in Canada.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Page not found
        </p>
      </div>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <ClerkAuthProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ClerkAuthProvider>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
