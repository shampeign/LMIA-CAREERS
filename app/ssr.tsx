/// <reference types="vinxi/types/server" />
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { createClerkHandler } from "@clerk/tanstack-start/server";

// Conditionally wrap with Clerk — only when CLERK_SECRET_KEY is configured.
// When Clerk is not set up, requests pass through unauthenticated.
function createHandler() {
  const secretKey =
    typeof process !== "undefined" && process.env?.CLERK_SECRET_KEY;

  if (secretKey) {
    // createStartHandler returns a function that takes a HandlerCallback
    // createClerkHandler wraps that function to inject auth state
    const clerkHandler = createClerkHandler(createStartHandler);
    return clerkHandler(defaultStreamHandler);
  }

  // No Clerk configured — use default handler
  return createStartHandler(defaultStreamHandler);
}

export default createHandler();
