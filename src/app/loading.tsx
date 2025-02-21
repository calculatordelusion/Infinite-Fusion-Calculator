export default function Loading() {
  return (
    <div className="space-y-4 grid-lines bg-slate-50 dark:bg-slate-900 p-1 md:p-4 border rounded-lg">
      {/* Header Skeleton */}
      <div className="space-y-3 px-2 p-1 text-center">
        <div className="bg-slate-200 dark:bg-slate-800 mx-auto rounded-md w-3/4 h-8 animate-pulse" />
        <div className="bg-slate-200 dark:bg-slate-800 mx-auto rounded-md w-2/3 h-4 animate-pulse" />
      </div>

      {/* Main Fusion Calculator Area */}
      <div className="space-y-8 mx-auto p-4 max-w-lg">
        {/* Pokemon Selection Area */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          {/* Head Pokemon Selection */}
          <div className="space-y-2">
            <div className="bg-slate-200 dark:bg-slate-800 rounded w-28 h-5 animate-pulse" />
            <div className="bg-slate-200 dark:bg-slate-800 rounded-lg h-12 animate-pulse" />
          </div>

          {/* Body Pokemon Selection */}
          <div className="space-y-2">
            <div className="bg-slate-200 dark:bg-slate-800 rounded w-28 h-5 animate-pulse" />
            <div className="bg-slate-200 dark:bg-slate-800 rounded-lg h-12 animate-pulse" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
          <div className="bg-slate-200 dark:bg-slate-800 rounded-md w-32 h-10 animate-pulse" />
          <div className="bg-slate-200 dark:bg-slate-800 rounded-md w-32 h-10 animate-pulse" />
          <div className="bg-indigo-200 dark:bg-indigo-900/50 rounded-md w-32 h-10 animate-pulse" />
        </div>

        {/* Help Text */}
        <div className="bg-slate-200 dark:bg-slate-800 mx-auto rounded w-3/4 h-5 animate-pulse" />
      </div>

      {/* Article Content Skeleton */}
      <div className="space-y-4 px-4 md:px-8 pt-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="bg-slate-200 dark:bg-slate-800 rounded w-full h-4 animate-pulse" />
            <div className="bg-slate-200 dark:bg-slate-800 rounded w-5/6 h-4 animate-pulse" />
            <div className="bg-slate-200 dark:bg-slate-800 rounded w-4/6 h-4 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
