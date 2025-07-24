export default function SearchLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border shadow-md p-4 animate-pulse space-y-4"
        >
          <div className="h-40 bg-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded mt-2" />
        </div>
      ))}
    </div>
  );
}
