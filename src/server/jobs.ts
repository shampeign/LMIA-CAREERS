import { createServerFn } from "@tanstack/react-start";
import { sql } from "~/db";
import type { Job } from "~/data/jobs";

interface JobRow {
  id: string;
  employer_slug: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Temporary";
  salary: string;
  remote: boolean;
  description: string;
  requirements: string[];
  education_required: string;
  experience_required: string;
  posted_date: string;
  deadline: string;
  category: string;
}

function rowToJob(row: JobRow): Job {
  return {
    id: row.id,
    employerSlug: row.employer_slug,
    title: row.title,
    location: row.location,
    type: row.type,
    salary: row.salary,
    remote: row.remote,
    description: row.description,
    requirements: row.requirements ?? [],
    educationRequired: row.education_required,
    experienceRequired: row.experience_required,
    postedDate: row.posted_date,
    deadline: row.deadline,
    category: row.category,
  };
}

/**
 * Fetch all jobs.
 */
export const getJobs = createServerFn().handler(async () => {
  const db = sql();

  const rows = await db`
    SELECT * FROM jobs ORDER BY posted_date DESC
  ` as JobRow[];

  return rows.map(rowToJob);
});

/**
 * Fetch a single job by ID.
 */
export const getJobById = createServerFn()
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("Invalid job ID");
    return id;
  })
  .handler(async ({ data: id }) => {
    const db = sql();

    const rows = await db`
      SELECT * FROM jobs WHERE id = ${id} LIMIT 1
    ` as JobRow[];

    if (rows.length === 0) return null;
    return rowToJob(rows[0]);
  });

/**
 * Fetch jobs for a specific employer by slug.
 */
export const getJobsByEmployerSlug = createServerFn()
  .validator((slug: unknown) => {
    if (typeof slug !== "string" || !slug) throw new Error("Invalid slug");
    return slug;
  })
  .handler(async ({ data: slug }) => {
    const db = sql();

    const rows = await db`
      SELECT * FROM jobs WHERE employer_slug = ${slug} ORDER BY posted_date DESC
    ` as JobRow[];

    return rows.map(rowToJob);
  });
