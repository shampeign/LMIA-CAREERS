import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ClerkAuthProvider } from "~/providers/clerk";
import { EmployerPreviewProvider } from "~/components/EmployerPreviewContext";
import { EmployerPreviewModal } from "~/components/EmployerPreviewModal";

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
      { name: "theme-color", content: "#FFFFFF" },
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
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center bg-[#FAFAFA]">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-[#0A0A0B]">
          404
        </h1>
        <p className="mt-4 text-lg text-[#6B7280]">
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
      <EmployerPreviewProvider>
        <RootDocument>
          <Outlet />
          <EmployerPreviewModal />
        </RootDocument>
      </EmployerPreviewProvider>
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
