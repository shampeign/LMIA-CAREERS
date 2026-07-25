import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getAuth } from "@clerk/tanstack-start/server";
import { sql } from "~/db";

export const toggleSavedJob = createServerFn()
  .validator((jobId: unknown) => {
    if (typeof jobId !== "string" || !jobId) {
      throw new Error("Invalid job ID");
    }
    return jobId;
  })
  .handler(async ({ data: jobId }) => {
    const request = getRequest();
    const { userId } = await getAuth(request);
    if (!userId) throw new Error("Not authenticated");

    const db = sql();

    await db`CREATE TABLE IF NOT EXISTS saved_jobs (
      user_id TEXT NOT NULL,
      job_id TEXT NOT NULL,
      saved_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (user_id, job_id)
    )`;

    // Check if already saved
    const existing = await db`SELECT 1 FROM saved_jobs WHERE user_id = ${userId} AND job_id = ${jobId} LIMIT 1`;

    if (existing.length > 0) {
      await db`DELETE FROM saved_jobs WHERE user_id = ${userId} AND job_id = ${jobId}`;
      return { saved: false };
    } else {
      await db`INSERT INTO saved_jobs (user_id, job_id) VALUES (${userId}, ${jobId})`;
      return { saved: true };
    }
  });

export const getSavedJobs = createServerFn().handler(async () => {
  const request = getRequest();
  const { userId } = await getAuth(request);
  if (!userId) return [] as string[];

  const db = sql();

  await db`CREATE TABLE IF NOT EXISTS saved_jobs (
    user_id TEXT NOT NULL,
    job_id TEXT NOT NULL,
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, job_id)
  )`;

  const rows = await db`SELECT job_id FROM saved_jobs WHERE user_id = ${userId} ORDER BY saved_at DESC`;
  return rows.map((r) => r.job_id) as string[];
});
