import Navbar from "@/components/Navbar";

// Shown instantly while the article is fetched/rendered on the server, so a
// card click gives immediate feedback instead of appearing to hang.
export default function ArticleLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 pt-8 text-center md:pt-12">
          <div className="mx-auto mb-6 h-3 w-40 rounded skeleton" />
          <div className="mx-auto mb-3 h-8 w-3/4 rounded skeleton" />
          <div className="mx-auto mb-3 h-8 w-2/3 rounded skeleton" />
          <div className="mx-auto mt-6 h-3 w-56 rounded skeleton" />
        </div>
        <div className="mx-auto mt-8 max-w-4xl px-5 md:mt-10">
          <div className="aspect-[16/9] w-full rounded-2xl skeleton" />
        </div>
        <div className="mx-auto max-w-3xl space-y-4 px-5 py-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-4 rounded skeleton ${
                i % 4 === 3 ? "w-2/3" : "w-full"
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
