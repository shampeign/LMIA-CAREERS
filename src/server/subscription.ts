import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getAuth } from "@clerk/tanstack-start/server";
import { sql } from "~/db";
import type { PlanTier } from "./profile";

/**
 * Activate a subscription plan for the currently authenticated user.
 *
 * IMPORTANT: In production, this should be triggered by a Stripe webhook
 * for security. The webhook should verify the Stripe signature and then
 * call this logic. For now, this server function serves as a placeholder
 * that can be called manually by an admin or triggered from the success page.
 */
export const activatePlan = createServerFn()
  .validator((input: unknown) => {
    const data = input as { plan: "professional" | "premium" };
    if (!data.plan || !["professional", "premium"].includes(data.plan)) {
      throw new Error('plan must be "professional" or "premium"');
    }
    return data;
  })
  .handler(async ({ data }) => {
    const request = getRequest();
    const { userId } = await getAuth(request);
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    const db = sql();
    const plan: PlanTier = data.plan;

    // Ensure the profiles table exists and has the plan column
    await db`CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      full_name TEXT,
      linkedin_url TEXT,
      education TEXT,
      experience TEXT,
      skills TEXT[],
      preferred_province TEXT,
      preferred_salary TEXT,
      work_authorization TEXT,
      resume_text TEXT,
      plan TEXT NOT NULL DEFAULT 'free',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`;

    await db`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'free'`;

    // Update the user's plan
    const result = await db`
      UPDATE profiles
      SET plan = ${plan}, updated_at = NOW()
      WHERE user_id = ${userId}
      RETURNING *
    `;

    if (result.length === 0) {
      return {
        success: false,
        error: "No profile found. Please complete your profile first.",
      };
    }

    const row = result[0];
    return {
      success: true,
      plan: row.plan as PlanTier,
      message: `Plan activated: ${data.plan}`,
    };
  });
