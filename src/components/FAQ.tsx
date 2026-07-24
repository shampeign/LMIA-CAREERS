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
    <section id="faq" className="bg-gray-50 px-4 py-20 dark:bg-gray-900/50 sm:py-28">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about LMIA Career AI.
          </p>
        </div>

        {/* FAQ items */}
        <div className="mt-14 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="pr-4 text-base font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
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
                    <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
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
