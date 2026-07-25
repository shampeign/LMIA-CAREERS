import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { saveProfile } from "~/server/profile";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

// ── Constants ──────────────────────────────────────────────────────────────

const WORK_AUTHORIZATIONS = [
  "Canadian Citizen",
  "Permanent Resident",
  "Work Permit",
  "Student Visa",
  "Other",
];

const EDUCATION_LEVELS = [
  "High School",
  "Diploma",
  "Bachelor's",
  "Master's",
  "PhD",
];

const EXPERIENCE_LEVELS = ["0-1", "1-3", "3-5", "5-10", "10+"];

const CANADIAN_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

const SALARY_RANGES = [
  "$30K-$50K",
  "$50K-$70K",
  "$70K-$90K",
  "$90K-$120K",
  "$120K+",
];

const COMMON_SKILLS = [
  "JavaScript",
  "Python",
  "Project Management",
  "Data Analysis",
  "Nursing",
  "Welding",
  "Truck Driving",
  "Accounting",
  "Sales",
  "Customer Service",
  "Java",
  "C#",
  "SQL",
  "AWS",
  "Azure",
  "Construction",
  "Electrical",
  "Plumbing",
  "Carpentry",
  "Marketing",
  "Graphic Design",
  "Human Resources",
  "Supply Chain",
  "Logistics",
  "Food Service",
  "Hospitality",
  "Agriculture",
  "Mechanical Engineering",
  "Civil Engineering",
  "Teaching",
];

const TOTAL_STEPS = 4;

// ── Types ──────────────────────────────────────────────────────────────────

interface OnboardingData {
  full_name: string;
  linkedin_url: string;
  work_authorization: string;
  education: string;
  experience: string;
  skills: string[];
  preferred_province: string;
  preferred_salary: string;
  resume_text: string;
  resume_filename: string;
}

const EMPTY_DATA: OnboardingData = {
  full_name: "",
  linkedin_url: "",
  work_authorization: "",
  education: "",
  experience: "",
  skills: [],
  preferred_province: "",
  preferred_salary: "",
  resume_text: "",
  resume_filename: "",
};

// ── Helper: compute profile completeness ───────────────────────────────────

function computeCompleteness(data: OnboardingData): number {
  const fields = [
    !!data.full_name,
    !!data.work_authorization,
    !!data.education,
    !!data.experience,
    data.skills.length > 0,
    !!data.preferred_province,
    !!data.preferred_salary,
    !!data.resume_text,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

// ── Page Component ─────────────────────────────────────────────────────────

function OnboardingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-gray-50 dark:bg-gray-950">
        <SignedIn>
          <OnboardingWizard />
        </SignedIn>
        <SignedOut>
          <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              Sign In Required
            </h2>
            <p className="mt-2 max-w-sm text-gray-500 dark:text-gray-400">
              You need to sign in to complete your profile setup.
            </p>
            <SignInButton mode="modal">
              <button
                type="button"
                className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>
      <Footer />
    </>
  );
}

// ── Wizard ─────────────────────────────────────────────────────────────────

function OnboardingWizard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<OnboardingData>(() => ({
    ...EMPTY_DATA,
    full_name:
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "",
  }));

  const update = (patch: Partial<OnboardingData>) => {
    setData((d) => ({ ...d, ...patch }));
  };

  const canNext = (): boolean => {
    switch (step) {
      case 1:
        return !!data.full_name.trim() && !!data.work_authorization;
      case 2:
        return !!data.education && !!data.experience;
      case 3:
        return !!data.preferred_province && !!data.preferred_salary;
      default:
        return true;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await saveProfile({
        full_name: data.full_name,
        linkedin_url: data.linkedin_url || undefined,
        work_authorization: data.work_authorization,
        education: data.education,
        experience: data.experience,
        skills: data.skills,
        preferred_province: data.preferred_province,
        preferred_salary: data.preferred_salary,
        resume_text: data.resume_text || undefined,
      });
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      setError("Please upload a .pdf, .doc, .docx, or .txt file.");
      return;
    }

    setError("");
    update({ resume_filename: file.name });

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      update({ resume_text: text.slice(0, 50000) }); // Limit to 50k chars
    };
    reader.onerror = () => {
      setError("Failed to read file. Please try again.");
    };

    // For text files, read as text; for binary formats, read as data URL
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  // ── Skill Tag Input ──────────────────────────────────────────────────

  const toggleSkill = (skill: string) => {
    setData((d) => ({
      ...d,
      skills: d.skills.includes(skill)
        ? d.skills.filter((s) => s !== skill)
        : [...d.skills, skill],
    }));
  };

  // ── Render Helpers ───────────────────────────────────────────────────

  const renderProgressBar = () => (
    <div className="mb-10">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === step;
          const isDone = stepNum < step;
          return (
            <div key={i} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  isDone
                    ? "bg-blue-600 text-white"
                    : isActive
                      ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/40"
                      : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {isDone ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              {i < TOTAL_STEPS - 1 && (
                <div
                  className={`mx-1 h-0.5 w-8 rounded transition-colors sm:w-12 ${
                    stepNum <= step
                      ? "bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Step label */}
      <p className="mt-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
        Step {step} of {TOTAL_STEPS}:{" "}
        {step === 1
          ? "Basic Info"
          : step === 2
            ? "Career Details"
            : step === 3
              ? "Job Preferences"
              : "Confirmation"}
      </p>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Full Name *
        </label>
        <input
          id="fullName"
          type="text"
          value={data.full_name}
          onChange={(e) => update({ full_name: e.target.value })}
          placeholder="John Doe"
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>
      <div>
        <label
          htmlFor="linkedin"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          LinkedIn URL
        </label>
        <input
          id="linkedin"
          type="url"
          value={data.linkedin_url}
          onChange={(e) => update({ linkedin_url: e.target.value })}
          placeholder="https://linkedin.com/in/yourprofile"
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>
      <div>
        <label
          htmlFor="workAuth"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Work Authorization Status *
        </label>
        <select
          id="workAuth"
          value={data.work_authorization}
          onChange={(e) => update({ work_authorization: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select your status...</option>
          {WORK_AUTHORIZATIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="education"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Education Level *
        </label>
        <select
          id="education"
          value={data.education}
          onChange={(e) => update({ education: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select education level...</option>
          {EDUCATION_LEVELS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Years of Experience *
        </label>
        <select
          id="experience"
          value={data.experience}
          onChange={(e) => update({ experience: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select experience range...</option>
          {EXPERIENCE_LEVELS.map((opt) => (
            <option key={opt} value={opt}>
              {opt} years
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Skills
        </label>
        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
          Select skills from the list below or type a custom skill and press Enter
        </p>
        {/* Custom skill input */}
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Type a skill and press Enter..."
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const val = (e.target as HTMLInputElement).value.trim();
                if (val && !data.skills.includes(val)) {
                  update({ skills: [...data.skills, val] });
                  (e.target as HTMLInputElement).value = "";
                }
              }
            }}
          />
        </div>
        {/* Selected skills */}
        {data.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    update({ skills: data.skills.filter((s) => s !== skill) })
                  }
                  className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-500 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-blue-800 dark:hover:text-blue-200"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {/* Common skills grid */}
        <div className="mt-3 flex flex-wrap gap-2">
          {COMMON_SKILLS.filter((s) => !data.skills.includes(s)).map(
            (skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                + {skill}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="province"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Preferred Province *
        </label>
        <select
          id="province"
          value={data.preferred_province}
          onChange={(e) => update({ preferred_province: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select a province...</option>
          {CANADIAN_PROVINCES.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="salary"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Preferred Salary Range *
        </label>
        <select
          id="salary"
          value={data.preferred_salary}
          onChange={(e) => update({ preferred_salary: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select salary range...</option>
          {SALARY_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Upload Resume
        </label>
        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
          Accepted: .pdf, .doc, .docx, .txt
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-blue-900/30 dark:file:text-blue-300 dark:hover:file:bg-blue-900/50"
        />
        {data.resume_filename && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            {data.resume_filename} uploaded
          </p>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => {
    const completeness = computeCompleteness(data);
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Review your profile information before saving.
        </p>

        {/* Summary card */}
        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <SummaryRow label="Full Name" value={data.full_name} />
          <SummaryRow
            label="LinkedIn"
            value={data.linkedin_url || "—"}
          />
          <SummaryRow
            label="Work Authorization"
            value={data.work_authorization}
          />
          <SummaryRow label="Education" value={data.education} />
          <SummaryRow label="Experience" value={`${data.experience} years`} />
          <SummaryRow
            label="Skills"
            value={
              data.skills.length > 0 ? data.skills.join(", ") : "—"
            }
          />
          <SummaryRow
            label="Preferred Province"
            value={data.preferred_province}
          />
          <SummaryRow
            label="Salary Range"
            value={data.preferred_salary}
          />
          <SummaryRow
            label="Resume"
            value={data.resume_filename || "Not uploaded"}
          />
        </div>

        {/* Completeness */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-900/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Profile Completeness
            </span>
            <span className="text-sm font-bold text-blue-800 dark:text-blue-300">
              {completeness}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-blue-200 dark:bg-blue-900/50">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const stepContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Profile Setup
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Complete Your Profile
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Help us match you with the best Canadian employers.
        </p>
      </div>

      {/* Progress bar */}
      {renderProgressBar()}

      {/* Error banner */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Step content */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        {stepContent()}

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Previous
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Summary Row ────────────────────────────────────────────────────────────

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="text-right text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}
