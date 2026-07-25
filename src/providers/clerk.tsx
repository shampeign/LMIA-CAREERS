import { ClerkProvider } from "@clerk/tanstack-start";
import type { ReactNode } from "react";

// The Clerk publishable key is read from VITE_CLERK_PUBLISHABLE_KEY at build time.
// The secret key (CLERK_SECRET_KEY) is only used server-side.
// When env vars are not set, ClerkProvider renders children as-is (no auth).

const publishableKey = (import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ??
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) as string | undefined;

export function ClerkAuthProvider({ children }: { children: ReactNode }) {
  if (!publishableKey) {
    // No Clerk configured — render children without auth
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      {children}
    </ClerkProvider>
  );
}
