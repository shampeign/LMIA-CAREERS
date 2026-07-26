/**
 * One-time migration/seed script: reads static employer/employer-LMIA/job data
 * from src/data/*.ts and inserts it into Neon Postgres tables.
 *
 * Idempotent — safe to re-run. Uses `CREATE TABLE IF NOT EXISTS` for schema
 * and `INSERT ... ON CONFLICT DO UPDATE` for data seeding.
 *
 * Usage:  bun run scripts/migrate-data-to-db.ts
 */

import { neon } from "@neondatabase/serverless";
import { employers } from "../src/data/employers";
import { employerLMIAData } from "../src/data/employer-lmia";
import { jobs } from "../src/data/jobs";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set — connect a database before running.");
  process.exit(1);
}

const sql = neon(url);

async function migrate() {
  console.log("=== LMIA Career AI — Data Migration ===\n");

  // ── 1. Create tables ──────────────────────────────────────────────

  console.log("Creating tables...");

  // employers
  await sql`
    CREATE TABLE IF NOT EXISTS employers (
      slug             TEXT PRIMARY KEY,
      name             TEXT NOT NULL,
      industry         TEXT NOT NULL,
      province         TEXT NOT NULL,
      city             TEXT NOT NULL,
      website          TEXT NOT NULL DEFAULT '',
      career_page      TEXT NOT NULL DEFAULT '',
      description      TEXT NOT NULL DEFAULT '',
      ai_summary       TEXT NOT NULL DEFAULT '',
      employee_count   TEXT NOT NULL DEFAULT '',
      founded          TEXT NOT NULL DEFAULT '',
      locations        JSONB NOT NULL DEFAULT '[]'::jsonb,
      hiring_history   JSONB NOT NULL DEFAULT '[]'::jsonb,
      open_positions   JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // employer_lmia
  await sql`
    CREATE TABLE IF NOT EXISTS employer_lmia (
      employer_slug            TEXT PRIMARY KEY REFERENCES employers(slug) ON DELETE CASCADE,
      total_approvals          INTEGER NOT NULL DEFAULT 0,
      negative_decisions       INTEGER NOT NULL DEFAULT 0,
      approval_rate            NUMERIC(5,2) NOT NULL DEFAULT 0,
      foreign_workers_estimated INTEGER NOT NULL DEFAULT 0,
      approved_positions       INTEGER NOT NULL DEFAULT 0,
      wage_average             NUMERIC(10,2) NOT NULL DEFAULT 0,
      wage_median              NUMERIC(10,2) NOT NULL DEFAULT 0,
      wage_min                 NUMERIC(10,2) NOT NULL DEFAULT 0,
      wage_max                 NUMERIC(10,2) NOT NULL DEFAULT 0,
      streams                  JSONB NOT NULL DEFAULT '{}'::jsonb,
      top_occupations          JSONB NOT NULL DEFAULT '[]'::jsonb,
      yearly_history           JSONB NOT NULL DEFAULT '[]'::jsonb,
      sponsorship_score        INTEGER NOT NULL DEFAULT 0,
      score_breakdown          JSONB NOT NULL DEFAULT '{}'::jsonb,
      hiring_provinces         JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // jobs
  await sql`
    CREATE TABLE IF NOT EXISTS jobs (
      id                 TEXT PRIMARY KEY,
      title              TEXT NOT NULL,
      employer_slug      TEXT NOT NULL REFERENCES employers(slug) ON DELETE CASCADE,
      location           TEXT NOT NULL DEFAULT '',
      type               TEXT NOT NULL DEFAULT 'Full-time',
      salary             TEXT NOT NULL DEFAULT '',
      "remote"           BOOLEAN NOT NULL DEFAULT false,
      description        TEXT NOT NULL DEFAULT '',
      requirements       JSONB NOT NULL DEFAULT '[]'::jsonb,
      education_required TEXT NOT NULL DEFAULT '',
      experience_required TEXT NOT NULL DEFAULT '',
      posted_date        TEXT NOT NULL DEFAULT '',
      deadline           TEXT NOT NULL DEFAULT '',
      category           TEXT NOT NULL DEFAULT '',
      created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  console.log("Tables created (or already existed).\n");

  // ── 2. Create indexes ─────────────────────────────────────────────

  console.log("Creating indexes...");

  // employers lookup indexes
  await sql`CREATE INDEX IF NOT EXISTS idx_employers_province ON employers (province)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_employers_industry ON employers (industry)`;

  // jobs lookup indexes
  await sql`CREATE INDEX IF NOT EXISTS idx_jobs_employer_slug ON jobs (employer_slug)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs (location)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs (category)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_jobs_type ON jobs (type)`;

  // employer_lmia filter/sort indexes
  await sql`CREATE INDEX IF NOT EXISTS idx_employer_lmia_sponsorship_score ON employer_lmia (sponsorship_score)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_employer_lmia_approval_rate ON employer_lmia (approval_rate)`;

  console.log("Indexes created (or already existed).\n");

  // ── 3. Seed employers ─────────────────────────────────────────────

  console.log(`Seeding ${employers.length} employers...`);
  let employerCount = 0;

  for (const e of employers) {
    await sql`
      INSERT INTO employers (
        slug, name, industry, province, city,
        website, career_page, description, ai_summary,
        employee_count, founded, locations, hiring_history, open_positions,
        updated_at
      ) VALUES (
        ${e.slug}, ${e.name}, ${e.industry}, ${e.province}, ${e.city},
        ${e.website ?? ""}, ${e.careerPage ?? ""}, ${e.description ?? ""}, ${e.aiSummary ?? ""},
        ${e.employeeCount ?? ""}, ${e.founded ?? ""},
        ${JSON.stringify(e.locations)}::jsonb,
        ${JSON.stringify(e.hiringHistory)}::jsonb,
        ${JSON.stringify(e.openPositions)}::jsonb,
        NOW()
      )
      ON CONFLICT (slug) DO UPDATE SET
        name             = EXCLUDED.name,
        industry         = EXCLUDED.industry,
        province         = EXCLUDED.province,
        city             = EXCLUDED.city,
        website          = EXCLUDED.website,
        career_page      = EXCLUDED.career_page,
        description      = EXCLUDED.description,
        ai_summary       = EXCLUDED.ai_summary,
        employee_count   = EXCLUDED.employee_count,
        founded          = EXCLUDED.founded,
        locations        = EXCLUDED.locations,
        hiring_history   = EXCLUDED.hiring_history,
        open_positions   = EXCLUDED.open_positions,
        updated_at       = NOW()
    `;
    employerCount++;
  }

  console.log(`  ✓ ${employerCount} employers inserted/updated.\n`);

  // ── 4. Seed employer_lmia ─────────────────────────────────────────

  const lmiaSlugs = Object.keys(employerLMIAData);
  console.log(`Seeding ${lmiaSlugs.length} employer LMIA records...`);
  let lmiaCount = 0;

  for (const slug of lmiaSlugs) {
    const d = employerLMIAData[slug];
    await sql`
      INSERT INTO employer_lmia (
        employer_slug,
        total_approvals, negative_decisions, approval_rate,
        foreign_workers_estimated, approved_positions,
        wage_average, wage_median, wage_min, wage_max,
        streams, top_occupations, yearly_history,
        sponsorship_score, score_breakdown, hiring_provinces,
        updated_at
      ) VALUES (
        ${slug},
        ${d.totalApprovals}, ${d.negativeDecisions}, ${d.approvalRate},
        ${d.foreignWorkersEstimated}, ${d.approvedPositions},
        ${d.wageAverage}, ${d.wageMedian}, ${d.wageMin}, ${d.wageMax},
        ${JSON.stringify(d.streams)}::jsonb,
        ${JSON.stringify(d.topOccupations)}::jsonb,
        ${JSON.stringify(d.yearlyHistory)}::jsonb,
        ${d.sponsorshipScore},
        ${JSON.stringify(d.scoreBreakdown)}::jsonb,
        ${JSON.stringify(d.hiringProvinces)}::jsonb,
        NOW()
      )
      ON CONFLICT (employer_slug) DO UPDATE SET
        total_approvals           = EXCLUDED.total_approvals,
        negative_decisions        = EXCLUDED.negative_decisions,
        approval_rate             = EXCLUDED.approval_rate,
        foreign_workers_estimated = EXCLUDED.foreign_workers_estimated,
        approved_positions        = EXCLUDED.approved_positions,
        wage_average              = EXCLUDED.wage_average,
        wage_median               = EXCLUDED.wage_median,
        wage_min                  = EXCLUDED.wage_min,
        wage_max                  = EXCLUDED.wage_max,
        streams                   = EXCLUDED.streams,
        top_occupations           = EXCLUDED.top_occupations,
        yearly_history            = EXCLUDED.yearly_history,
        sponsorship_score         = EXCLUDED.sponsorship_score,
        score_breakdown           = EXCLUDED.score_breakdown,
        hiring_provinces          = EXCLUDED.hiring_provinces,
        updated_at                = NOW()
    `;
    lmiaCount++;
  }

  console.log(`  ✓ ${lmiaCount} LMIA records inserted/updated.\n`);

  // ── 5. Seed jobs ──────────────────────────────────────────────────

  console.log(`Seeding ${jobs.length} jobs...`);
  let jobCount = 0;

  for (const j of jobs) {
    await sql`
      INSERT INTO jobs (
        id, title, employer_slug, location, type, salary, "remote",
        description, requirements, education_required, experience_required,
        posted_date, deadline, category, updated_at
      ) VALUES (
        ${j.id}, ${j.title}, ${j.employerSlug}, ${j.location}, ${j.type}, ${j.salary}, ${j.remote},
        ${j.description}, ${JSON.stringify(j.requirements)}::jsonb,
        ${j.educationRequired}, ${j.experienceRequired},
        ${j.postedDate}, ${j.deadline ?? ""}, ${j.category},
        NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        title              = EXCLUDED.title,
        employer_slug      = EXCLUDED.employer_slug,
        location           = EXCLUDED.location,
        type               = EXCLUDED.type,
        salary             = EXCLUDED.salary,
        "remote"           = EXCLUDED."remote",
        description        = EXCLUDED.description,
        requirements       = EXCLUDED.requirements,
        education_required = EXCLUDED.education_required,
        experience_required = EXCLUDED.experience_required,
        posted_date        = EXCLUDED.posted_date,
        deadline           = EXCLUDED.deadline,
        category           = EXCLUDED.category,
        updated_at         = NOW()
    `;
    jobCount++;
  }

  console.log(`  ✓ ${jobCount} jobs inserted/updated.\n`);

  // ── 6. Verify ─────────────────────────────────────────────────────

  console.log("=== Verification ===\n");

  const empRows = await sql`SELECT count(*)::int AS cnt FROM employers`;
  const lmiaRows = await sql`SELECT count(*)::int AS cnt FROM employer_lmia`;
  const jobRows = await sql`SELECT count(*)::int AS cnt FROM jobs`;

  const eCnt = empRows[0]?.cnt ?? 0;
  const lCnt = lmiaRows[0]?.cnt ?? 0;
  const jCnt = jobRows[0]?.cnt ?? 0;

  console.log(`Row counts:`);
  console.log(`  employers:      ${eCnt}  (expected: ${employers.length})  ${eCnt === employers.length ? "✓" : "✗ MISMATCH"}`);
  console.log(`  employer_lmia:  ${lCnt}  (expected: ${lmiaSlugs.length})  ${lCnt === lmiaSlugs.length ? "✓" : "✗ MISMATCH"}`);
  console.log(`  jobs:           ${jCnt}  (expected: ${jobs.length})  ${jCnt === jobs.length ? "✓" : "✗ MISMATCH"}`);

  // Check FK integrity: all jobs.employer_slug resolve to employers.slug
  const orphanJobs = await sql`
    SELECT j.id, j.employer_slug
    FROM jobs j
    LEFT JOIN employers e ON e.slug = j.employer_slug
    WHERE e.slug IS NULL
  `;
  if (orphanJobs.length > 0) {
    console.log(`\n  ✗ Orphan jobs found (employer_slug not in employers): ${orphanJobs.length}`);
    for (const o of orphanJobs) console.log(`    - ${o.id} → ${o.employer_slug}`);
  } else {
    console.log(`  ✓ All job FKs resolve (no orphan employer_slugs).`);
  }

  console.log("\n=== Migration Complete ===");
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });
