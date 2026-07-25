export function PageLoadingSkeleton() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#0B0E14]">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-3">
          <div className="h-3 w-3 animate-pulse rounded-full bg-[#2563EB]/60 [animation-delay:0ms]" />
          <div className="h-3 w-3 animate-pulse rounded-full bg-[#2563EB]/60 [animation-delay:150ms]" />
          <div className="h-3 w-3 animate-pulse rounded-full bg-[#2563EB]/60 [animation-delay:300ms]" />
        </div>
        <div className="h-4 w-48 animate-pulse rounded-full bg-white/5" />
        <div className="h-3 w-32 animate-pulse rounded-full bg-white/[0.03]" />
      </div>
    </div>
  );
}
