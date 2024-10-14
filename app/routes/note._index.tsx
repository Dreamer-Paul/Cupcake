import { ChangeEvent } from "react";
import { Link, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import Pagination from "~/components/common/pagination";
import { clsn, siteTitle } from "~/utils";
import { getFirstImage, years } from "~/utils/note";
import { StarFill, ThumbUpFill } from "~/components/common/icons";

export const meta: MetaFunction = () => {
  return [
    { title: siteTitle("日记") },
    { name: "description", content: "奇趣保罗的日常笔记" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const year = url.searchParams.get("year") || new Date().getFullYear();
  const page = url.searchParams.get("page") || 1;

  const note = await fetch(`https://paul.ren/api/note/?page=${page}&year=${year}`).then((res) => res.json()) as API.PageResponse<API.Note.INoteData[]>;

  return { note, page, year };
}

export default function Note() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { note, page, year } = useLoaderData<typeof loader>();

  const onChangeYear = (ev: ChangeEvent<HTMLSelectElement>) => {
    navigate({
      search: `?year=${ev.target.value}`,
    });
  };

  const onChangePage = (value: number) => {
    const year = params.get("year");
    const nextParams: Record<string, string> = {
      page: `${value}`,
    };

    if (year !== null) {
      nextParams.year = year;
    }

    setParams(nextParams);
  };

  return (
    <main className="px-2 py-24 max-w-3xl mx-auto">
      <section className="mb-12">
        <h1 className="text-center text-5xl/tight md:text-7xl/tight">日记</h1>
      </section>
      <section className="mb-12">
        {note.data.map((item) => {
          const year = item.date.substring(0, 4);
          const cover = getFirstImage(item);

          return (
            <Link
              key={item.id}
              className="block group relative overflow-hidden p-5 bg-white rounded-xl mb-8 last:mb-0 border-4 border-transparent hover:border-pink-400 transition-colors border-b-cyan-200"
              to={`/note/${year}/${item.id}`}
              viewTransition
            >
              {item.starred && (
                <StarFill className="absolute -top-5 -right-5 w-28 h-28 text-yellow-300 text-opacity-20 -rotate-[23deg]" />
              )}
              <h2 className="text-pink-400 text-2xl font-bold mb-4" style={{ viewTransitionName: `note-title-${item.id}` }}>
                {item.title}
              </h2>
              <p className={clsn(cover && "mr-40", "mb-8 relative")}>{item.except}</p>
              <div className="flex items-end justify-between text-sm">
                <p className="opacity-60">{item.date}</p>
                <span className="flex items-center opacity-60">
                  <ThumbUpFill className="h-4 w-4 mr-1" />
                  {item.likes}
                </span>
              </div>
              {cover && (
                <div
                  className="absolute top-0 right-0 bottom-0 w-40 transition-opacity bg-cover opacity-30 group-hover:opacity-80"
                  style={{ backgroundImage: `url("${cover}")`, clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                />
              )}
            </Link>
          );
        })}
      </section>
      <section className="flex gap-4 flex-col-reverse justify-between md:flex-row items-center">
        <select
          className="cursor-pointer px-5 py-3 rounded-xl border-4 border-transparent border-b-cyan-200"
          value={year}
          onChange={onChangeYear}
        >
          {years.map((year) => (
            <option key={year} value={year}>{year} 年</option>
          ))}
        </select>
        <Pagination current={Number(page)} size={7} total={note.count} onClick={onChangePage} />
      </section>
    </main>
  );
}
