const steps = [
  {
    number: "01",
    title: "Discover Employers",
    description:
      "Browse our comprehensive directory of Canadian employers with public TFWP hiring history. Filter by industry, province, and role type.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m7.5-18v18m7.5-18v18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 7.5h3m-3 3h3m-3 3h3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI-Powered Matching",
    description:
      "Our AI analyzes your skills and experience to match you with the most relevant job opportunities. Spend less time searching, more time applying.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Land the Job",
    description:
      "Optimize your resume, craft compelling cover letters with AI, and practice with interview simulations tailored to Canadian employers.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2563EB]">
            How It Works
          </p>
          <h2 className="mt-4 text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1A1A2E] sm:text-[52px]">
            Your path to a Canadian job, simplified
          </h2>
          <p className="mt-5 text-[18px] leading-relaxed text-[#6B7280]">
            Three steps from discovery to your offer letter.
          </p>
        </div>

        <div className="mt-20 space-y-20">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.number}
                className={`flex flex-col items-center gap-12 lg:flex-row ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual side */}
                <div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/2">
                  <div className="flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] text-[#2563EB] shadow-sm">
                    {step.icon}
                  </div>
                </div>

                {/* Text side */}
                <div className="w-full lg:w-1/2">
                  <span className="inline-block text-6xl font-extrabold text-[#E5E7EB] select-none">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-[26px] font-bold text-[#1A1A2E]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[#6B7280]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
