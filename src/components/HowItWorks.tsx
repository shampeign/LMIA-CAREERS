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
    <section id="how-it-works" className="bg-white px-6 py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0A0A0B]">
            Your path to a Canadian job, simplified
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280]">
            Three steps from discovery to your offer letter.
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="border border-[#F0F0F0] rounded-2xl bg-white p-10"
            >
              <span className="text-6xl font-bold text-[#F0F0F0] select-none">
                {step.number}
              </span>
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
