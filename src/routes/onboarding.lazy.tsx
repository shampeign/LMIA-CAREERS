import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { saveProfile } from "~/server/profile";
import { useState, useRef } from "react";
export default function OnboardingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#0B0E14]">
        <SignedIn><OnboardingWizard /></SignedIn>
        <SignedOut>
          <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <svg className="h-8 w-8 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            </div>
            <h2 className="mt-8 text-[28px] font-bold text-white">Sign In Required</h2>
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

  const inputClass = "mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-[16px] text-white placeholder:text-[#6B7280] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10";
  const selectClass = "mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-[16px] text-white focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10";

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase text-[#6B7280]">Profile Setup</span>
        <h1 className="mt-3 text-[32px] font-bold tracking-[-0.03em] text-white">Complete Your Profile</h1>
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
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold ${isDone ? "bg-[#2563EB] text-white" : isActive ? "bg-[#2563EB] text-white ring-4 ring-[#DBEAFE]" : "bg-white/10 text-[#6B7280]"}`}>
                  {isDone ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> : stepNum}
                </div>
                {i < TOTAL_STEPS - 1 && <div className={`mx-1 h-0.5 w-8 rounded transition-colors sm:w-14 ${stepNum <= step ? "bg-[#2563EB]" : "bg-white/10"}`} />}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-sm font-medium text-[#6B7280]">Step {step} of {TOTAL_STEPS}: {step === 1 ? "Basic Info" : step === 2 ? "Career Details" : step === 3 ? "Job Preferences" : "Confirmation"}</p>
      </div>

      {error && <div className="mb-8 rounded-2xl border border-red-200 bg-red-50/50 px-5 py-4 text-sm text-red-700">{error}</div>}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-8  sm:p-10">
        {/* Step content */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-white">Full Name *</label>
              <input id="fullName" type="text" value={data.full_name} onChange={(e) => update({ full_name: e.target.value })} placeholder="John Doe" className={inputClass} />
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-semibold text-white">LinkedIn URL</label>
              <input id="linkedin" type="url" value={data.linkedin_url} onChange={(e) => update({ linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/yourprofile" className={inputClass} />
            </div>
            <div>
              <label htmlFor="workAuth" className="block text-sm font-semibold text-white">Work Authorization Status *</label>
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
              <label htmlFor="education" className="block text-sm font-semibold text-white">Education Level *</label>
              <select id="education" value={data.education} onChange={(e) => update({ education: e.target.value })} className={selectClass}>
                <option value="">Select education level...</option>
                {EDUCATION_LEVELS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-semibold text-white">Years of Experience *</label>
              <select id="experience" value={data.experience} onChange={(e) => update({ experience: e.target.value })} className={selectClass}>
                <option value="">Select experience range...</option>
                {EXPERIENCE_LEVELS.map((opt) => <option key={opt} value={opt}>{opt} years</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white">Skills</label>
              <p className="mt-1 text-xs text-[#6B7280]">Select skills from the list below or type a custom skill and press Enter</p>
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
                  <button key={skill} type="button" onClick={() => toggleSkill(skill)} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#B0B8C4] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]">+ {skill}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="province" className="block text-sm font-semibold text-white">Preferred Province *</label>
              <select id="province" value={data.preferred_province} onChange={(e) => update({ preferred_province: e.target.value })} className={selectClass}>
                <option value="">Select a province...</option>
                {CANADIAN_PROVINCES.map((prov) => <option key={prov} value={prov}>{prov}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-semibold text-white">Preferred Salary Range *</label>
              <select id="salary" value={data.preferred_salary} onChange={(e) => update({ preferred_salary: e.target.value })} className={selectClass}>
                <option value="">Select salary range...</option>
                {SALARY_RANGES.map((range) => <option key={range} value={range}>{range}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white">Upload Resume</label>
              <p className="mt-1 text-xs text-[#6B7280]">Accepted: .pdf, .doc, .docx, .txt</p>
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange}
                className="mt-3 block w-full text-sm text-[#6B7280] file:mr-5 file:rounded-2xl file:border-0 file:bg-white/10 file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-white/10" />
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
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6">
              {[
                ["Full Name", data.full_name], ["LinkedIn", data.linkedin_url || "—"], ["Work Authorization", data.work_authorization],
                ["Education", data.education], ["Experience", `${data.experience} years`],
                ["Skills", data.skills.length > 0 ? data.skills.join(", ") : "—"], ["Preferred Province", data.preferred_province],
                ["Salary Range", data.preferred_salary], ["Resume", data.resume_filename || "Not uploaded"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-[#6B7280]">{label}</span>
                  <span className="text-right text-sm font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1E40AF]">Profile Completeness</span>
                <span className="text-sm font-bold text-[#1E40AF]">{computeCompleteness(data)}%</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-[#BFDBFE]">
                <div className="h-2 rounded-full bg-[#2563EB] duration-500" style={{ width: `${computeCompleteness(data)}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-10 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-[16px] font-medium text-white transition-colors hover:bg-white/5">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Previous
            </button>
          ) : <div />}

          {step < TOTAL_STEPS ? (
            <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-6 py-3 text-[16px] font-semibold text-white  hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50">
              Next
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </button>
          ) : (
            <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-6 py-3 text-[16px] font-semibold text-white  hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50">
              {saving ? <><span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />Saving...</> : "Complete Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
