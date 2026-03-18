export default function SpeciesLoading() {
  return (
    <div className="min-h-screen">
      <div className="bg-teal-dark/50 animate-pulse py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-12 w-72 bg-white/10 rounded-lg mx-auto mb-4" />
          <div className="h-5 w-96 max-w-full bg-white/10 rounded-lg mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-xl overflow-hidden border border-gray-100">
              <div className="aspect-square bg-gray-100" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-gray-100 rounded" />
                <div className="h-3 w-1/2 bg-gray-100 rounded" />
                <div className="h-8 w-20 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
