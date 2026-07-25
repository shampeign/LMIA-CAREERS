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

const DEFAULT_TITLE = "LMIA Career AI — Canada's LMIA Employer Intelligence Platform";
const DEFAULT_DESCRIPTION =
  "Discover Canadian employers with TFWP hiring history. Browse 30+ employers, 62+ jobs, LMIA analytics, sponsorship scores, and AI-powered job matching.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: DEFAULT_TITLE },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { name: "theme-color", content: "#FFFFFF" },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:title", content: DEFAULT_TITLE },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "LMIA Career AI" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: DEFAULT_TITLE },
      { name: "twitter:description", content: DEFAULT_DESCRIPTION },
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
    <div className="flex min-h-dvh items-center justify-center bg-white">
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "LMIA Career AI",
              description:
                "Canada's LMIA employer intelligence platform — discover employers with TFWP hiring history, get AI-matched to jobs, optimize your resume, and land your dream job in Canada.",
              applicationCategory: "Employment",
              operatingSystem: "Web",
              url: "https://lmiacareersai.com",
            }),
          }}
        />
      </head>
      <body className="font-sans">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
