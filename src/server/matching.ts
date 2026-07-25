import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getAuth } from "@clerk/tanstack-start/server";
import { getProfile } from "~/server/profile";
import { jobs, type Job } from "~/data/jobs";
import type { Profile } from "~/server/profile";

// ── Types ────────────────────────────────────────────────────────────────────

export interface MatchBreakdown {
  skillsScore: number;
  experienceScore: number;
  educationScore: number;
  locationScore: number;
  salaryScore: number;
}

export interface JobMatch {
  job: Job;
  matchScore: number;
  breakdown: MatchBreakdown;
  matchedSkills: string[];
  missingSkills: string[];
  tips: string[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

// Rank education levels numerically
const educationRank: Record<string, number> = {
  "high school": 1,
  "diploma": 2,
  "associate": 2,
  "bachelor's": 3,
  "bachelor": 3,
  "master's": 4,
  "master": 4,
  "phd": 5,
  "doctorate": 5,
};

// Rank experience levels numerically (midpoint approximation)
const experienceRank: Record<string, number> = {
  "0-1 years": 0.5,
  "1-3 years": 2,
  "3-5 years": 4,
  "5+ years": 7,
  "7+ years": 8,
  "10+ years": 10,
};

// Salary range tiers from profile options
const salaryTiers: { label: string; min: number; max: number }[] = [
  { label: "Under $40,000", min: 0, max: 40000 },
  { label: "$40,000 - $60,000", min: 40000, max: 60000 },
  { label: "$60,000 - $80,000", min: 60000, max: 80000 },
  { label: "$80,000 - $100,000", min: 80000, max: 100000 },
  { label: "$100,000 - $130,000", min: 100000, max: 130000 },
  { label: "$130,000+", min: 130000, max: Infinity },
];

function parseSalary(salary: string): number {
  const match = salary.match(/\$?([\d,]+)/);
  if (match) return parseInt(match[1].replace(/,/g, ""), 10);
  return 0;
}

function getSalaryRange(salaryStr: string): { min: number; max: number } {
  // Parse job salary format "$42,000 - $52,000"
  const parts = salaryStr.match(/\$?([\d,]+)\s*-\s*\$?([\d,]+)/);
  if (parts) {
    return {
      min: parseInt(parts[1].replace(/,/g, ""), 10),
      max: parseInt(parts[2].replace(/,/g, ""), 10),
    };
  }
  const single = parseSalary(salaryStr);
  return { min: single, max: single };
}

function extractProvince(location: string): string {
  const parts = location.split(", ");
  return parts[parts.length - 1] || "";
}

function normalizeString(s: string): string {
  return s.toLowerCase().trim();
}

function partialMatch(userSkill: string, jobReq: string): boolean {
  const us = normalizeString(userSkill);
  const jr = normalizeString(jobReq);

  // Direct substring match either direction
  if (us.includes(jr) || jr.includes(us)) return true;

  // Split into words and check if any key word matches
  const userWords = us.split(/[\s/]+/);
  const jobWords = jr.split(/[\s/]+/);

  // If >= 50% of meaningful words overlap
  const meaningfulUserWords = userWords.filter((w) => w.length > 2);
  const meaningfulJobWords = jobWords.filter((w) => w.length > 2);

  if (meaningfulUserWords.length === 0 || meaningfulJobWords.length === 0) return false;

  const matchedWords = meaningfulJobWords.filter(
    (jw) => meaningfulUserWords.some((uw) => uw.includes(jw) || jw.includes(uw))
  );

  return matchedWords.length / meaningfulJobWords.length >= 0.5;
}

function getExperienceValue(label: string): number {
  const key = normalizeString(label);
  if (experienceRank[key] !== undefined) return experienceRank[key];

  // Try to match partial labels
  for (const [k, v] of Object.entries(experienceRank)) {
    if (key.includes(k) || k.includes(key)) return v;
  }

  // Default for unknown
  return 2;
}

function getEducationValue(label: string): number {
  const key = normalizeString(label);
  if (educationRank[key] !== undefined) return educationRank[key];

  for (const [k, v] of Object.entries(educationRank)) {
    if (key.includes(k) || k.includes(key)) return v;
  }

  return 2; // default diploma level
}

function getSalaryTierIndex(label: string): number {
  const idx = salaryTiers.findIndex((t) => t.label === label);
  return idx >= 0 ? idx : -1;
}

// ── Scoring Functions ────────────────────────────────────────────────────────

function scoreSkills(profile: Profile, job: Job): {
  score: number;
  matched: string[];
  missing: string[];
} {
  if (!profile.skills || profile.skills.length === 0 || job.requirements.length === 0) {
    return { score: 0, matched: [], missing: job.requirements };
  }

  const matched: string[] = [];
  const missing: string[] = [];

  for (const req of job.requirements) {
    const isMatched = profile.skills.some((skill) => partialMatch(skill, req));
    if (isMatched) {
      matched.push(req);
    } else {
      missing.push(req);
    }
  }

  const ratio = matched.length / job.requirements.length;
  return { score: Math.round(ratio * 40), matched, missing };
}

function scoreExperience(profile: Profile, job: Job): number {
  if (!profile.experience) return 0;

  const userExp = getExperienceValue(profile.experience);
  const jobExp = getExperienceValue(job.experienceRequired);

  if (userExp >= jobExp) return 20; // meets or exceeds

  // Partial credit based on how close
  const ratio = userExp / jobExp;
  return Math.round(ratio * 20);
}

function scoreEducation(profile: Profile, job: Job): number {
  if (!profile.education) return 0;

  const userEdu = getEducationValue(profile.education);
  const jobEdu = getEducationValue(job.educationRequired);

  if (userEdu >= jobEdu) return 15; // meets or exceeds

  const diff = jobEdu - userEdu;
  if (diff === 1) return 8; // one level off = half
  if (diff === 2) return 4;
  return 0;
}

function scoreLocation(profile: Profile, job: Job): number {
  if (!profile.preferred_province) return 0;

  const jobProvince = extractProvince(job.location);
  if (normalizeString(profile.preferred_province) === normalizeString(jobProvince)) {
    return 15;
  }
  return 0;
}

function scoreSalary(profile: Profile, job: Job): number {
  if (!profile.preferred_salary) return 0;

  const userTierIdx = getSalaryTierIndex(profile.preferred_salary);
  if (userTierIdx < 0) return 0;

  const jobRange = getSalaryRange(job.salary);
  const userTier = salaryTiers[userTierIdx];

  // Check if job salary overlaps with user's preferred tier
  if (jobRange.min <= userTier.max && jobRange.max >= userTier.min) {
    return 10; // overlapping = full points
  }

  // Adjacent tier = half
  const prevTier = salaryTiers[userTierIdx - 1];
  const nextTier = salaryTiers[userTierIdx + 1];

  if (prevTier && jobRange.min <= prevTier.max && jobRange.max >= prevTier.min) return 5;
  if (nextTier && jobRange.min <= nextTier.max && jobRange.max >= nextTier.min) return 5;

  return 0;
}

// ── Tips Generator ───────────────────────────────────────────────────────────

function generateTips(profile: Profile, job: Job, breakdown: MatchBreakdown, missing: string[]): string[] {
  const tips: string[] = [];

  if (breakdown.skillsScore < 30) {
    tips.push(
      `This job requires ${missing.length} skill${missing.length > 1 ? "s" : ""} you don't have yet. Consider courses or certifications in: ${missing.slice(0, 3).join(", ")}${missing.length > 3 ? "..." : ""}.`
    );
  }

  if (breakdown.experienceScore < 15) {
    tips.push(
      `You need more experience for this role (requires ${job.experienceRequired}, you have ${profile.experience || "unspecified"}). Look for intermediate positions to build up.`
    );
  }

  if (breakdown.educationScore < 10) {
    tips.push(
      `This role prefers ${job.educationRequired} education (you have ${profile.education || "unspecified"}). A bridging program or additional certification could help.`
    );
  }

  if (breakdown.locationScore === 0 && profile.preferred_province) {
    tips.push(
      `This job is in ${extractProvince(job.location)}, but you prefer ${profile.preferred_province}. Consider whether you would relocate.`
    );
  }

  if (breakdown.salaryScore < 5) {
    tips.push(
      `This job's salary range (${job.salary}) may not match your preference (${profile.preferred_salary || "not set"}). Negotiate or adjust expectations.`
    );
  }

  if (tips.length === 0 && breakdown.skillsScore >= 35 && breakdown.experienceScore >= 18) {
    tips.push("You're a strong match! Highlight your relevant skills in your application and prepare for interviews.");
  }

  return tips;
}

// ── Main Server Function ─────────────────────────────────────────────────────

export const getJobMatches = createServerFn().handler(async (): Promise<JobMatch[]> => {
  const request = getRequest();
  const { userId } = await getAuth(request);

  if (!userId) {
    return [];
  }

  const profile = await getProfile();
  if (!profile) {
    return [];
  }

  const results: JobMatch[] = jobs.map((job) => {
    const skillsResult = scoreSkills(profile, job);
    const experienceScore = scoreExperience(profile, job);
    const educationScore = scoreEducation(profile, job);
    const locationScore = scoreLocation(profile, job);
    const salaryScore = scoreSalary(profile, job);

    const breakdown: MatchBreakdown = {
      skillsScore: skillsResult.score,
      experienceScore,
      educationScore,
      locationScore,
      salaryScore,
    };

    const matchScore = Math.round(
      skillsResult.score + experienceScore + educationScore + locationScore + salaryScore
    );

    const tips = generateTips(profile, job, breakdown, skillsResult.missing);

    return {
      job,
      matchScore,
      breakdown,
      matchedSkills: skillsResult.matched,
      missingSkills: skillsResult.missing,
      tips,
    };
  });

  // Sort by match score descending
  results.sort((a, b) => b.matchScore - a.matchScore);
  return results;
});

// Match for a single job
export const getJobMatch = createServerFn()
  .validator((input: unknown) => {
    const data = input as { jobId: string };
    if (typeof data.jobId !== "string") {
      throw new Error("jobId must be a string");
    }
    return data;
  })
  .handler(async ({ data }): Promise<JobMatch | null> => {
    const request = getRequest();
    const { userId } = await getAuth(request);

    if (!userId) return null;

    const profile = await getProfile();
    if (!profile) return null;

    const job = jobs.find((j) => j.id === data.jobId);
    if (!job) return null;

    const skillsResult = scoreSkills(profile, job);
    const experienceScore = scoreExperience(profile, job);
    const educationScore = scoreEducation(profile, job);
    const locationScore = scoreLocation(profile, job);
    const salaryScore = scoreSalary(profile, job);

    const breakdown: MatchBreakdown = {
      skillsScore: skillsResult.score,
      experienceScore,
      educationScore,
      locationScore,
      salaryScore,
    };

    const matchScore = Math.round(
      skillsResult.score + experienceScore + educationScore + locationScore + salaryScore
    );

    const tips = generateTips(profile, job, breakdown, skillsResult.missing);

    return {
      job,
      matchScore,
      breakdown,
      matchedSkills: skillsResult.matched,
      missingSkills: skillsResult.missing,
      tips,
    };
  });
