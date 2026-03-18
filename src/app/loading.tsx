export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-teal-dark/50 animate-pulse py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-4 w-48 bg-white/10 rounded-full mx-auto mb-6" />
          <div className="h-12 w-96 max-w-full bg-white/10 rounded-lg mx-auto mb-4" />
          <div className="h-5 w-80 max-w-full bg-white/10 rounded-lg mx-auto" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-xl p-6 border border-gray-100"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl mb-4" />
              <div className="h-5 w-3/4 bg-gray-100 rounded mb-3" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-100 rounded" />
                <div className="h-3 w-5/6 bg-gray-100 rounded" />
                <div className="h-3 w-2/3 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
