import { createServerFn } from "@tanstack/react-start";
import { sql } from "~/db";
import type { Employer, EmployerLocation, HiringRecord, OpenPosition } from "~/data/employers";
import type { EmployerLMIA } from "~/data/employer-lmia";

// ── DB row shapes ──────────────────────────────────────────

interface EmployerRow {
  slug: string;
  name: string;
  industry: string;
  province: string;
  city: string;
  website: string;
  career_page: string;
  description: string;
  ai_summary: string;
  employee_count: string;
  founded: string;
  locations: EmployerLocation[];
  hiring_history: HiringRecord[];
  open_positions: OpenPosition[];
}

interface EmployerLMIARow {
  employer_slug: string;
  total_approvals: number;
  negative_decisions: number;
  approval_rate: number;
  foreign_workers_estimated: number;
  approved_positions: number;
  wage_average: number;
  wage_median: number;
  wage_min: number;
  wage_max: number;
  streams: EmployerLMIA["streams"];
  top_occupations: EmployerLMIA["topOccupations"];
  yearly_history: EmployerLMIA["yearlyHistory"];
  sponsorship_score: number;
  score_breakdown: EmployerLMIA["scoreBreakdown"];
  hiring_provinces: EmployerLMIA["hiringProvinces"];
}

// ── Helpers ─────────────────────────────────────────────────

function rowToEmployer(row: EmployerRow): Employer {
  return {
    slug: row.slug,
    name: row.name,
    industry: row.industry,
    province: row.province,
    city: row.city,
    website: row.website,
    careerPage: row.career_page,
    description: row.description,
    aiSummary: row.ai_summary,
    employeeCount: row.employee_count,
    founded: row.founded,
    locations: row.locations ?? [],
    hiringHistory: row.hiring_history ?? [],
    openPositions: row.open_positions ?? [],
  };
}

function rowToLMIA(row: EmployerLMIARow): EmployerLMIA {
  return {
    totalApprovals: Number(row.total_approvals),
    negativeDecisions: Number(row.negative_decisions),
    approvalRate: Number(row.approval_rate),
    foreignWorkersEstimated: Number(row.foreign_workers_estimated),
    approvedPositions: Number(row.approved_positions),
    wageAverage: Number(row.wage_average),
    wageMedian: Number(row.wage_median),
    wageMin: Number(row.wage_min),
    wageMax: Number(row.wage_max),
    streams: row.streams ?? { highWage: 0, lowWage: 0, prStream: 0, agriculture: 0, globalTalent: 0, caregiver: 0 },
    topOccupations: row.top_occupations ?? [],
    yearlyHistory: row.yearly_history ?? [],
    sponsorshipScore: Number(row.sponsorship_score),
    scoreBreakdown: row.score_breakdown ?? { activity: 0, consistency: 0, approvalRate: 0, diversity: 0 },
    hiringProvinces: row.hiring_provinces ?? [],
  };
}

// ── Public server functions ─────────────────────────────────

/**
 * Fetch all employers with their LMIA data.
 */
export const getEmployers = createServerFn().handler(async () => {
  const db = sql();

  const employerRows = await db`
    SELECT * FROM employers ORDER BY name
  ` as EmployerRow[];

  const lmiaRows = await db`
    SELECT * FROM employer_lmia
  ` as EmployerLMIARow[];

  const lmiaMap = new Map<string, EmployerLMIA>();
  for (const row of lmiaRows) {
    lmiaMap.set(row.employer_slug, rowToLMIA(row));
  }

  const employers: Employer[] = employerRows.map((row) => {
    const e = rowToEmployer(row);
    e.lmia = lmiaMap.get(row.slug);
    return e;
  });

  return employers;
});

/**
 * Fetch a single employer by slug, with LMIA data.
 */
export const getEmployerBySlug = createServerFn()
  .validator((slug: unknown) => {
    if (typeof slug !== "string" || !slug) throw new Error("Invalid slug");
    return slug;
  })
  .handler(async ({ data: slug }) => {
    const db = sql();

    const employerRows = await db`
      SELECT * FROM employers WHERE slug = ${slug} LIMIT 1
    ` as EmployerRow[];

    if (employerRows.length === 0) return null;

    const employer = rowToEmployer(employerRows[0]);

    const lmiaRows = await db`
      SELECT * FROM employer_lmia WHERE employer_slug = ${slug} LIMIT 1
    ` as EmployerLMIARow[];

    employer.lmia = lmiaRows.length > 0 ? rowToLMIA(lmiaRows[0]) : undefined;

    return employer;
  });

/**
 * Fetch featured employers by their slugs.
 */
export const getFeaturedEmployers = createServerFn()
  .validator((slugs: unknown) => {
    if (!Array.isArray(slugs) || !slugs.every((s) => typeof s === "string")) {
      throw new Error("slugs must be an array of strings");
    }
    return slugs as string[];
  })
  .handler(async ({ data: slugs }) => {
    const db = sql();

    const employerRows = await db`
      SELECT * FROM employers WHERE slug = ANY(${slugs})
    ` as EmployerRow[];

    const lmiaRows = await db`
      SELECT * FROM employer_lmia WHERE employer_slug = ANY(${slugs})
    ` as EmployerLMIARow[];

    const lmiaMap = new Map<string, EmployerLMIA>();
    for (const row of lmiaRows) {
      lmiaMap.set(row.employer_slug, rowToLMIA(row));
    }

    // Preserve the requested slug order
    const employerMap = new Map<string, EmployerRow>();
    for (const row of employerRows) {
      employerMap.set(row.slug, row);
    }

    return slugs
      .map((slug) => {
        const row = employerMap.get(slug);
        if (!row) return null;
        const e = rowToEmployer(row);
        e.lmia = lmiaMap.get(slug);
        return e;
      })
      .filter(Boolean) as Employer[];
  });
