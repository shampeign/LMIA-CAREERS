export function PartnerTrustStrip() {
  const badges = [
    "40+ Countries",
    "30+ Employers",
    "60+ Active Jobs",
    "Public Data Only",
    "Free Tier Available",
    "AI-Powered Tools",
  ];

  return (
    <section className="border-y border-[#E5E7EB] bg-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#9CA3AF] mb-8">
          Trusted by job seekers from around the world
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {badges.map((badge) => (
            <span
              key={badge}
              className="text-[15px] font-medium text-[#9CA3AF] grayscale"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
