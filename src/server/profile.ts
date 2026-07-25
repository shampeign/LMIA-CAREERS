import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getAuth } from "@clerk/tanstack-start/server";
import { sql } from "~/db";

export interface Profile {
  id: number;
  user_id: string;
  full_name: string | null;
  linkedin_url: string | null;
  education: string | null;
  experience: string | null;
  skills: string[] | null;
  preferred_province: string | null;
  preferred_salary: string | null;
  work_authorization: string | null;
  resume_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileInput {
  full_name?: string;
  linkedin_url?: string;
  education?: string;
  experience?: string;
  skills?: string[];
  preferred_province?: string;
  preferred_salary?: string;
  work_authorization?: string;
  resume_text?: string;
}

export const getProfile = createServerFn().handler(async () => {
  const request = getRequest();
  const { userId } = await getAuth(request);
  if (!userId) {
    return null;
  }

  const db = sql();

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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  const rows = await db`SELECT * FROM profiles WHERE user_id = ${userId} LIMIT 1`;

  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    ...row,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  } as Profile;
});

export const saveProfile = createServerFn()
  .validator((input: unknown) => {
    const data = input as ProfileInput;
    // Basic validation — allow partial updates
    if (data.full_name !== undefined && typeof data.full_name !== "string") {
      throw new Error("full_name must be a string");
    }
    if (data.linkedin_url !== undefined && typeof data.linkedin_url !== "string") {
      throw new Error("linkedin_url must be a string");
    }
    if (data.education !== undefined && typeof data.education !== "string") {
      throw new Error("education must be a string");
    }
    if (data.experience !== undefined && typeof data.experience !== "string") {
      throw new Error("experience must be a string");
    }
    if (data.skills !== undefined && !Array.isArray(data.skills)) {
      throw new Error("skills must be an array of strings");
    }
    if (data.preferred_province !== undefined && typeof data.preferred_province !== "string") {
      throw new Error("preferred_province must be a string");
    }
    if (data.preferred_salary !== undefined && typeof data.preferred_salary !== "string") {
      throw new Error("preferred_salary must be a string");
    }
    if (data.work_authorization !== undefined && typeof data.work_authorization !== "string") {
      throw new Error("work_authorization must be a string");
    }
    if (data.resume_text !== undefined && typeof data.resume_text !== "string") {
      throw new Error("resume_text must be a string");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const request = getRequest();
    const { userId } = await getAuth(request);
    if (!userId) throw new Error("Not authenticated");

    const db = sql();

    // Ensure table exists
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
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`;

    // Upsert profile
    const rows = await db`
      INSERT INTO profiles (
        user_id, full_name, linkedin_url, education, experience,
        skills, preferred_province, preferred_salary, work_authorization, resume_text
      ) VALUES (
        ${userId},
        ${data.full_name ?? null},
        ${data.linkedin_url ?? null},
        ${data.education ?? null},
        ${data.experience ?? null},
        ${data.skills ?? null},
        ${data.preferred_province ?? null},
        ${data.preferred_salary ?? null},
        ${data.work_authorization ?? null},
        ${data.resume_text ?? null}
      )
      ON CONFLICT (user_id)
      DO UPDATE SET
        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
        linkedin_url = COALESCE(EXCLUDED.linkedin_url, profiles.linkedin_url),
        education = COALESCE(EXCLUDED.education, profiles.education),
        experience = COALESCE(EXCLUDED.experience, profiles.experience),
        skills = COALESCE(EXCLUDED.skills, profiles.skills),
        preferred_province = COALESCE(EXCLUDED.preferred_province, profiles.preferred_province),
        preferred_salary = COALESCE(EXCLUDED.preferred_salary, profiles.preferred_salary),
        work_authorization = COALESCE(EXCLUDED.work_authorization, profiles.work_authorization),
        resume_text = COALESCE(EXCLUDED.resume_text, profiles.resume_text),
        updated_at = NOW()
      RETURNING *
    `;

    const row = rows[0];
    return {
      ...row,
      created_at: String(row.created_at),
      updated_at: String(row.updated_at),
    } as Profile;
  });
