import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { saveProfile } from "~/server/profile";
import { useState, useRef } from "react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Complete Your Profile — LMIA Career AI" },
      {
        name: "description",
        content:
          "Complete your LMIA Career AI profile to get personalized job matches. Tell us about your skills, experience, and preferences for Canadian job opportunities.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/onboarding" }],
  }),
  component: OnboardingPage,
});

const WORK_AUTHORIZATIONS = ["Canadian Citizen", "Permanent Resident", "Work Permit", "Student Visa", "Other"];
const EDUCATION_LEVELS = ["High School", "Diploma", "Bachelor's", "Master's", "PhD"];
const EXPERIENCE_LEVELS = ["0-1", "1-3", "3-5", "5-10", "10+"];
const CANADIAN_PROVINCES = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"];
const SALARY_RANGES = ["$30K-$50K", "$50K-$70K", "$70K-$90K", "$90K-$120K", "$120K+"];
const COMMON_SKILLS = ["JavaScript", "Python", "Project Management", "Data Analysis", "Nursing", "Welding", "Truck Driving", "Accounting", "Sales", "Customer Service", "Java", "C#", "SQL", "AWS", "Azure", "Construction", "Electrical", "Plumbing", "Carpentry", "Marketing", "Graphic Design", "Human Resources", "Supply Chain", "Logistics", "Food Service", "Hospitality", "Agriculture", "Mechanical Engineering", "Civil Engineering", "Teaching"];
const TOTAL_STEPS = 4;

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
  full_name: "", linkedin_url: "", work_authorization: "", education: "", experience: "",
  skills: [], preferred_province: "", preferred_salary: "", resume_text: "", resume_filename: "",
};

function computeCompleteness(data: OnboardingData): number {
  const fields = [!!data.full_name, !!data.work_authorization, !!data.education, !!data.experience, data.skills.length > 0, !!data.preferred_province, !!data.preferred_salary, !!data.resume_text];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

function OnboardingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#FAFAFA]">
        <SignedIn><OnboardingWizard /></SignedIn>
        <SignedOut>
          <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F0F0F0]">
              <svg className="h-8 w-8 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            </div>
            <h2 className="mt-8 text-[28px] font-bold text-[#0A0A0B]">Sign In Required</h2>
            <p className="mt-3 max-w-sm text-[16px] text-[#6B7280]">You need to sign in to complete your profile setup.</p>
            <SignInButton mode="modal">
              <button type="button" className="mt-8 rounded-2xl bg-[#2563EB] px-6 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]">Sign In</button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>
      <Footer />
    </>
  );
}

function OnboardingWizard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<OnboardingData>(() => ({ ...EMPTY_DATA, full_name: [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "" }));

  const update = (patch: Partial<OnboardingData>) => setData((d) => ({ ...d, ...patch }));

  const canNext = (): boolean => {
    switch (step) {
      case 1: return !!data.full_name.trim() && !!data.work_authorization;
      case 2: return !!data.education && !!data.experience;
      case 3: return !!data.preferred_province && !!data.preferred_salary;
      default: return true;
    }
  };

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      await saveProfile({ full_name: data.full_name, linkedin_url: data.linkedin_url || undefined, work_authorization: data.work_authorization, education: data.education, experience: data.experience, skills: data.skills, preferred_province: data.preferred_province, preferred_salary: data.preferred_salary, resume_text: data.resume_text || undefined });
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally { setSaving(false); }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt)$/i)) { setError("Please upload a .pdf, .doc, .docx, or .txt file."); return; }
    setError(""); update({ resume_filename: file.name });
    const reader = new FileReader();
    reader.onload = () => { update({ resume_text: (reader.result as string).slice(0, 50000) }); };
    reader.onerror = () => { setError("Failed to read file. Please try again."); };
    if (file.type === "text/plain" || file.name.endsWith(".txt")) reader.readAsText(file);
    else reader.readAsDataURL(file);
  };

  const toggleSkill = (skill: string) => {
    setData((d) => ({ ...d, skills: d.skills.includes(skill) ? d.skills.filter((s) => s !== skill) : [...d.skills, skill] }));
  };

  const inputClass = "mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3.5 text-[16px] text-[#0A0A0B] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10";
  const selectClass = "mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3.5 text-[16px] text-[#0A0A0B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10";

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">Profile Setup</span>
        <h1 className="mt-3 text-[32px] font-bold tracking-[-0.03em] text-[#0A0A0B]">Complete Your Profile</h1>
        <p className="mt-3 text-[16px] text-[#6B7280]">Help us match you with the best Canadian employers.</p>
      </div>

      {/* Progress bar */}
      <div className="mb-14">
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === step;
            const isDone = stepNum < step;
            return (
              <div key={i} className="flex items-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold transition-all ${isDone ? "bg-[#2563EB] text-white" : isActive ? "bg-[#2563EB] text-white ring-4 ring-[#DBEAFE]" : "bg-[#F0F0F0] text-[#9CA3AF]"}`}>
                  {isDone ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> : stepNum}
                </div>
                {i < TOTAL_STEPS - 1 && <div className={`mx-1 h-0.5 w-8 rounded transition-colors sm:w-14 ${stepNum <= step ? "bg-[#2563EB]" : "bg-[#F0F0F0]"}`} />}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-sm font-medium text-[#9CA3AF]">Step {step} of {TOTAL_STEPS}: {step === 1 ? "Basic Info" : step === 2 ? "Career Details" : step === 3 ? "Job Preferences" : "Confirmation"}</p>
      </div>

      {error && <div className="mb-8 rounded-2xl border border-red-200 bg-red-50/50 px-5 py-4 text-sm text-red-700">{error}</div>}

      <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm sm:p-10">
        {/* Step content */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-[#0A0A0B]">Full Name *</label>
              <input id="fullName" type="text" value={data.full_name} onChange={(e) => update({ full_name: e.target.value })} placeholder="John Doe" className={inputClass} />
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-semibold text-[#0A0A0B]">LinkedIn URL</label>
              <input id="linkedin" type="url" value={data.linkedin_url} onChange={(e) => update({ linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/yourprofile" className={inputClass} />
            </div>
            <div>
              <label htmlFor="workAuth" className="block text-sm font-semibold text-[#0A0A0B]">Work Authorization Status *</label>
              <select id="workAuth" value={data.work_authorization} onChange={(e) => update({ work_authorization: e.target.value })} className={selectClass}>
                <option value="">Select your status...</option>
                {WORK_AUTHORIZATIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="education" className="block text-sm font-semibold text-[#0A0A0B]">Education Level *</label>
              <select id="education" value={data.education} onChange={(e) => update({ education: e.target.value })} className={selectClass}>
                <option value="">Select education level...</option>
                {EDUCATION_LEVELS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-semibold text-[#0A0A0B]">Years of Experience *</label>
              <select id="experience" value={data.experience} onChange={(e) => update({ experience: e.target.value })} className={selectClass}>
                <option value="">Select experience range...</option>
                {EXPERIENCE_LEVELS.map((opt) => <option key={opt} value={opt}>{opt} years</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A0A0B]">Skills</label>
              <p className="mt-1 text-xs text-[#9CA3AF]">Select skills from the list below or type a custom skill and press Enter</p>
              <input type="text" placeholder="Type a skill and press Enter..." className={inputClass}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); const val = (e.target as HTMLInputElement).value.trim(); if (val && !data.skills.includes(val)) { update({ skills: [...data.skills, val] }); (e.target as HTMLInputElement).value = ""; } } }} />
              {data.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] px-4 py-1.5 text-sm font-medium text-[#1D4ED8]">
                      {skill}
                      <button type="button" onClick={() => update({ skills: data.skills.filter((s) => s !== skill) })} className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[#3B82F6] hover:bg-[#BFDBFE] hover:text-[#1E40AF]" aria-label={`Remove ${skill}`}>×</button>
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {COMMON_SKILLS.filter((s) => !data.skills.includes(s)).map((skill) => (
                  <button key={skill} type="button" onClick={() => toggleSkill(skill)} className="rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-medium text-[#4B5563] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]">+ {skill}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="province" className="block text-sm font-semibold text-[#0A0A0B]">Preferred Province *</label>
              <select id="province" value={data.preferred_province} onChange={(e) => update({ preferred_province: e.target.value })} className={selectClass}>
                <option value="">Select a province...</option>
                {CANADIAN_PROVINCES.map((prov) => <option key={prov} value={prov}>{prov}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-semibold text-[#0A0A0B]">Preferred Salary Range *</label>
              <select id="salary" value={data.preferred_salary} onChange={(e) => update({ preferred_salary: e.target.value })} className={selectClass}>
                <option value="">Select salary range...</option>
                {SALARY_RANGES.map((range) => <option key={range} value={range}>{range}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A0A0B]">Upload Resume</label>
              <p className="mt-1 text-xs text-[#9CA3AF]">Accepted: .pdf, .doc, .docx, .txt</p>
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange}
                className="mt-3 block w-full text-sm text-[#6B7280] file:mr-5 file:rounded-2xl file:border-0 file:bg-[#F0F0F0] file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-[#0A0A0B] hover:file:bg-[#E5E7EB]" />
              {data.resume_filename && (
                <p className="mt-3 flex items-center gap-1.5 text-sm text-[#16A34A]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  {data.resume_filename} uploaded
                </p>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <p className="text-[16px] text-[#6B7280]">Review your profile information before saving.</p>
            <div className="space-y-3 rounded-3xl border border-[#F0F0F0] bg-[#FAFAFA] p-6">
              {[
                ["Full Name", data.full_name], ["LinkedIn", data.linkedin_url || "—"], ["Work Authorization", data.work_authorization],
                ["Education", data.education], ["Experience", `${data.experience} years`],
                ["Skills", data.skills.length > 0 ? data.skills.join(", ") : "—"], ["Preferred Province", data.preferred_province],
                ["Salary Range", data.preferred_salary], ["Resume", data.resume_filename || "Not uploaded"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-[#9CA3AF]">{label}</span>
                  <span className="text-right text-sm font-semibold text-[#0A0A0B]">{value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1E40AF]">Profile Completeness</span>
                <span className="text-sm font-bold text-[#1E40AF]">{computeCompleteness(data)}%</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-[#BFDBFE]">
                <div className="h-2 rounded-full bg-[#2563EB] transition-all duration-500" style={{ width: `${computeCompleteness(data)}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-10 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3 text-[16px] font-medium text-[#0A0A0B] transition-colors hover:bg-[#F8F9FA]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Previous
            </button>
          ) : <div />}

          {step < TOTAL_STEPS ? (
            <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-6 py-3 text-[16px] font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50">
              Next
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </button>
          ) : (
            <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-6 py-3 text-[16px] font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50">
              {saving ? <><span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />Saving...</> : "Complete Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
