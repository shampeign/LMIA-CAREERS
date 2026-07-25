import { useState } from "react";

const faqs = [
  {
    question: "What is LMIA Career AI?",
    answer:
      "LMIA Career AI is a career platform designed for people seeking jobs in Canada. We aggregate public employer data — including TFWP (Temporary Foreign Worker Program) hiring history — and provide AI-powered tools to help you discover opportunities, optimize your resume, craft cover letters, and prepare for interviews.",
  },
  {
    question: "Is LMIA Career AI free to use?",
    answer:
      "We offer a Free tier with access to our employer directory and basic job search features. Our Professional ($19/mo) and Premium ($39/mo) tiers unlock AI-powered tools like resume optimization, cover letter generation, and interview simulations.",
  },
  {
    question: "Do you guarantee job placement?",
    answer:
      "No. We provide tools and data to help you make informed decisions and strengthen your applications, but we do not guarantee job placement or visa sponsorship. Job offers depend on your qualifications, the employer, and the current labor market.",
  },
  {
    question: "Do you handle visa or immigration applications?",
    answer:
      "No. LMIA Career AI is not an immigration consultancy. We do not process visa applications, provide legal advice, or intervene with Immigration, Refugees and Citizenship Canada (IRCC). We help you find employers — you handle the rest.",
  },
  {
    question: "How does the AI matching work?",
    answer:
      "Our AI analyzes your skills, experience, and preferences, then cross-references them with job listings and employer profiles in our database. It surfaces the opportunities that best match your profile, saving you hours of manual searching. You always have the final say on which jobs to pursue.",
  },
  {
    question: "When is the launch?",
    answer:
      "We're currently in development and plan to launch our beta in the coming months. Join the waitlist above to get early access — we'll notify you as soon as we're live.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-white px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
            FAQ
          </span>
          <h2 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B] sm:text-[48px]">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280]">
            Everything you need to know about LMIA Career AI.
          </p>
        </div>

        {/* FAQ items */}
        <div className="mt-16 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-3xl border border-[#F0F0F0] bg-white shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="pr-4 text-[17px] font-semibold text-[#0A0A0B]">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-[#9CA3AF] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-8 pb-6 text-[16px] leading-relaxed text-[#6B7280]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
