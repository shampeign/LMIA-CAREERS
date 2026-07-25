const steps = [
  {
    number: "01",
    title: "Discover Employers",
    description:
      "Browse our comprehensive directory of Canadian employers with public TFWP hiring history. Filter by industry, province, and role type.",
  },
  {
    number: "02",
    title: "AI-Powered Matching",
    description:
      "Our AI analyzes your skills and experience to match you with the most relevant job opportunities. Spend less time searching, more time applying.",
  },
  {
    number: "03",
    title: "Land the Job",
    description:
      "Optimize your resume, craft compelling cover letters with AI, and practice with interview simulations tailored to Canadian employers.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
            How It Works
          </span>
          <h2 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B] sm:text-[48px]">
            Your path to a Canadian job,{" "}
            <span className="text-[#2563EB]">simplified</span>
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280]">
            Three steps from discovery to your offer letter.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-3xl border border-[#F0F0F0] bg-white p-10 shadow-sm transition-all hover:border-[#E5E7EB] hover:shadow-md"
            >
              {/* Step number */}
              <span className="text-6xl font-bold text-[#F0F0F0] transition-colors group-hover:text-[#E5E7EB] select-none">
                {step.number}
              </span>
              {/* Content */}
              <h3 className="mt-6 text-[24px] font-bold text-[#0A0A0B]">
                {step.title}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-[#6B7280]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
