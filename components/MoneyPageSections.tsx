import Link from "next/link";
import type { MoneyPageContent } from "@/data/moneyPageContent";
import { tools } from "@/data/tools";

export default function MoneyPageSections({
  content,
  showTable = true,
}: {
  content: MoneyPageContent;
  showTable?: boolean;
}) {
  const ctaTools = content.ctaSlugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool));

  return (
    <>
      <section className="mt-12 space-y-5 text-lg leading-8 text-slate-300">
        {content.overview.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      {showTable && (
        <section className="mt-16">
          <h2 className="text-3xl font-black">Practical comparison</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-slate-900">
                <tr>
                  {content.table.headers.map((header) => (
                    <th key={header} className="p-4 text-slate-200">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.table.rows.map((row) => (
                  <tr key={row.join("-")} className="border-t border-white/10">
                    {row.map((cell, index) => (
                      <td
                        key={`${index}-${cell}`}
                        className={
                          index === 0
                            ? "p-4 font-semibold text-slate-200"
                            : "p-4 leading-7 text-slate-400"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="mt-16">
        <h2 className="text-3xl font-black">Best for</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {content.bestFor.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="border-l-4 border-emerald-400 bg-emerald-400/5 p-7">
          <h2 className="text-2xl font-black">
            When a free browser tool is enough
          </h2>
          <ul className="ml-5 mt-5 list-disc space-y-3 leading-7 text-slate-300">
            {content.freeBrowserEnough.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="border-l-4 border-amber-300 bg-amber-300/5 p-7">
          <h2 className="text-2xl font-black">
            When paid or desktop software may be better
          </h2>
          <ul className="ml-5 mt-5 list-disc space-y-3 leading-7 text-slate-300">
            {content.paidSoftwareBetter.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 border-y border-white/10 py-12">
        <h2 className="text-3xl font-black">Try a free A2ZConvertor tool</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-400">
          Start with the specific task you need. No account is required for
          these A2ZConvertor tools.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {ctaTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/convert/${tool.slug}`}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Open {tool.name}
            </Link>
          ))}
        </div>
      </section>

      <aside className="mt-12 border-l-4 border-blue-400 bg-blue-400/5 p-6">
        <h2 className="text-sm font-bold uppercase text-blue-300">
          Recommendation disclosure
        </h2>
        <p className="mt-3 leading-7 text-slate-300">{content.disclosure}</p>
      </aside>
    </>
  );
}
