export function LoadingSkeleton({ count = 4, className = '' }) {
  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse rounded-sm border border-softgrey bg-white p-4"
        >
          <div className="mb-4 h-52 w-full rounded-sm bg-cream" />
          <div className="mb-2 h-3 w-1/3 rounded bg-cream" />
          <div className="mb-4 h-5 w-3/4 rounded bg-cream" />
          <div className="flex items-center justify-between">
            <div className="h-4 w-16 rounded bg-cream" />
            <div className="h-9 w-24 rounded bg-cream" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
