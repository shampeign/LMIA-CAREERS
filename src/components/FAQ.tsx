import { useState } from "react";

const faqs = [
  {
    question: "What is LMIA Career AI?",
    answer:
      "LMIA Career AI is a career platform for people seeking jobs in Canada. We aggregate public employer data — including TFWP hiring history — and provide AI-powered tools to help you discover opportunities, optimize your resume, and prepare for interviews.",
  },
  {
    question: "Is LMIA Career AI free?",
    answer:
      "We offer a Free tier with access to our employer directory and basic job search. Our Professional ($19/mo) and Premium ($39/mo) tiers unlock AI-powered tools like resume optimization, cover letter generation, and interview simulations.",
  },
  {
    question: "Do you handle visa or immigration applications?",
    answer:
      "No. LMIA Career AI is not an immigration consultancy. We do not process visa applications, provide legal advice, or intervene with IRCC. We help you find employers — you handle the rest.",
  },
  {
    question: "How does the AI matching work?",
    answer:
      "Our AI analyzes your skills, experience, and preferences, then cross-references them with job listings and employer profiles in our database. It surfaces the best matches, saving you hours of manual searching.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-white px-6 py-40">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0A0A0B]">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-16 space-y-1">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="border-b border-[#E5E7EB]"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between py-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="pr-4 text-[17px] font-semibold text-[#0A0A0B]">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-[#9CA3AF] ${isOpen ? "rotate-180" : ""}`}
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
                  className={`grid ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-[16px] leading-relaxed text-[#4B5563]">
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
