/** Shown the instant a route segment starts loading — Header/Footer stay
 *  mounted (they live in the root layout), only this fills the page area.
 *  Every page's data comes from the same admin-client Supabase queries, so
 *  this is only ever visible for a beat before the cached/streamed content
 *  replaces it. */
export default function PageLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-pink-200 border-t-pink-500"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
