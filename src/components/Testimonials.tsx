const testimonials = [
  {
    quote:
      "As an international student in Toronto, finding employers who actually sponsor workers was overwhelming. LMIA Career AI made it so much easier to focus my applications on companies that have a track record of hiring internationally.",
    name: "Priya Sharma",
    role: "International Student, Toronto",
    initials: "PS",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  },
  {
    quote:
      "I've been a skilled tradesperson for 12 years, but navigating the Canadian job market from abroad was tough. The employer directory helped me identify companies in Alberta that match my welding background.",
    name: "Carlos Mendez",
    role: "Skilled Worker, Calgary",
    initials: "CM",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  },
  {
    quote:
      "After immigrating to Canada last year, I struggled to get interviews despite having strong qualifications. The AI resume optimization helped me tailor my CV to Canadian standards — I landed three interviews in two weeks.",
    name: "Amina Yusuf",
    role: "New Immigrant, Vancouver",
    initials: "AY",
    color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  },
];

export function Testimonials() {
  return (
    <section className="bg-gray-50 px-4 py-20 dark:bg-gray-900/50 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Trusted by job seekers like you
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Hear from people who've used our platform to find opportunities in Canada.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Quote */}
              <blockquote className="flex-1">
                <svg
                  className="mb-4 h-8 w-8 text-blue-200 dark:text-blue-800"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-gray-700">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${t.color}`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
