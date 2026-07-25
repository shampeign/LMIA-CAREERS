const testimonials = [
  {
    quote:
      "As an international student in Toronto, finding employers who actually sponsor workers was overwhelming. LMIA Career AI made it so much easier to focus my applications on companies that have a track record of hiring internationally.",
    name: "Priya Sharma",
    role: "International Student, Toronto",
    initials: "PS",
  },
  {
    quote:
      "I've been a skilled tradesperson for 12 years, but navigating the Canadian job market from abroad was tough. The employer directory helped me identify companies in Alberta that match my welding background.",
    name: "Carlos Mendez",
    role: "Skilled Worker, Calgary",
    initials: "CM",
  },
  {
    quote:
      "After immigrating to Canada last year, I struggled to get interviews despite having strong qualifications. The AI resume optimization helped me tailor my CV to Canadian standards — I landed three interviews in two weeks.",
    name: "Amina Yusuf",
    role: "New Immigrant, Vancouver",
    initials: "AY",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase text-[#9CA3AF]">
            Testimonials
          </span>
          <h2 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B] sm:text-[48px]">
            Trusted by job seekers like you
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280]">
            Hear from people who've used our platform to find opportunities in Canada.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-[#F0F0F0] bg-white p-10 "
            >
              {/* Quote */}
              <blockquote className="flex-1">
                <svg
                  className="mb-6 h-8 w-8 text-[#E5E7EB]"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-[16px] leading-relaxed text-[#6B7280]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div className="mt-8 flex items-center gap-3 border-t border-[#F0F0F0] pt-6">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0] text-sm font-bold text-[#4B5563]"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-[#0A0A0B]">
                    {t.name}
                  </div>
                  <div className="text-sm text-[#9CA3AF]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
