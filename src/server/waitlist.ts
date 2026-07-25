import { createServerFn } from "@tanstack/react-start";
import { sql } from "~/db";

export const submitWaitlistEmail = createServerFn()
  .validator((email: unknown) => {
    if (
      typeof email !== "string" ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      throw new Error("Please enter a valid email address");
    }
    return email;
  })
  .handler(async ({ data: email }) => {
    const db = sql();
    await db`CREATE TABLE IF NOT EXISTS waitlist (id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
    try {
      await db`INSERT INTO waitlist (email) VALUES (${email})`;
      return { success: true };
    } catch (err: any) {
      if (err?.message?.includes("duplicate") || err?.code === "23505") {
        return { success: true }; // already on the list, don't reveal
      }
      throw err;
    }
  });
