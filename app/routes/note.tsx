import { type ChangeEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import { StarFill, ThumbUpFill } from "~/components/ui/icons";
import Pagination from "~/components/ui/pagination";
import { clsn, siteTitle } from "~/utils";
import { getFirstImage, years } from "~/utils/note";

import type { Route } from "./+types/note";

export function meta({}: Route.MetaArgs) {
  return [
    { title: siteTitle("日记") },
    { name: "description", content: "奇趣保罗的日常笔记" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const year = url.searchParams.get("year") || new Date().getFullYear();
  const page = url.searchParams.get("page") || 1;

  const note = await fetch(`https://paul.ren/api/note/?page=${page}&year=${year}`).then((res) => res.json()) as API.PageResponse<API.Note.INoteData[]>;

  return { note, page, year };
}

export default function Note({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { note, page, year } = loaderData;

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
    <main className="px-2 py-24 max-w-4xl mx-auto">
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
                <StarFill className="absolute -top-5 -right-5 w-28 h-28 text-yellow-300 text-opacity-20 rotate-[-23deg]" />
              )}
              <h2 className={clsn(cover && "mt-48 sm:mt-0 md:mr-40", "text-pink-400 text-2xl font-bold mb-4")} style={{ viewTransitionName: `note-title-${item.id}` }}>
                {item.title}
              </h2>
              <p className={clsn(cover && "sm:mr-40", "mb-8 relative")}>{item.except}</p>
              <div className={clsn(cover && "sm:mr-40", "flex items-end justify-between text-sm")}>
                <p className="opacity-60">{item.date}</p>
                <span className="flex items-center opacity-60">
                  <ThumbUpFill className="h-4 w-4 mr-1" />
                  {item.likes}
                </span>
              </div>
              {cover && (
                <div
                  className="absolute h-48 sm:h-auto sm:w-40 left-0 top-0 sm:left-[unset] right-0 sm:bottom-0 transition-opacity bg-cover opacity-80 sm:opacity-30 group-hover:opacity-80 sm:[clip-path:polygon(25%_0%,100%_0%,100%_100%,0%_100%)]"
                  style={{ backgroundImage: `url("${cover}")` }}
                />
              )}
            </Link>
          );
        })}
      </section>
      <section className="flex gap-4 flex-col-reverse justify-between md:flex-row items-center">
        <select
          className="cursor-pointer px-5 py-3 rounded-xl bg-white border-4 border-transparent border-b-cyan-200"
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
