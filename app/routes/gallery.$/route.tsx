import { NavLink, useLoaderData, useNavigate } from "@remix-run/react";
import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import Pagination from "~/components/common/pagination";
import { clsn, siteTitle } from "~/utils";
import { StarFill } from "~/components/common/icons";

import styles from "./styles.module.less";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: siteTitle(data?.currentCategory?.name || "相册") },
    { name: "description", content: data?.currentCategory?.description || "奇趣保罗的照片与收藏" },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";

  const searchParams = new URLSearchParams();
  searchParams.append("page", page);

  const category = await fetch(`https://paul.ren/api/gallery`).then((res) => res.json()) as unknown as API.PageResponse<API.Gallery.ICateData[]>;
  let cateIndex = -1;

  if (params["*"]) {
    cateIndex = category.data.findIndex((item) => item.slug === params["*"]);

    if (cateIndex === -1) {
      throw json("Not Found", { status: 404 });
    }

    searchParams.append("cate", String(category.data[cateIndex].id));
  }

  const media = await fetch(`https://paul.ren/api/media/?${searchParams.toString()}`).then((res) => res.json()) as unknown as API.PageResponse<API.Media.IMediaData[]>;
  const currentCategory = cateIndex > -1 ? category.data[cateIndex]: undefined;

  return json({ media, category, currentCategory, page });
}

export default function Gallery() {
  const navigate = useNavigate();
  const { media, category, page } = useLoaderData<typeof loader>();

  const onChangePage = (value: number) => {
    navigate({
      search: `?page=${value}`,
    });
  };

  return (
    <main className="px-2 py-24 max-w-screen-2xl mx-auto">
      <section className="mb-12">
        <h1 className="text-center text-5xl/tight md:text-7xl/tight mb-12">相册</h1>
        <div className="flex overflow-auto whitespace-nowrap">
          <NavLink to="/gallery" end className={({ isActive }) => clsn("inline-block px-3 py-1 ml-auto mr-3", isActive && "text-pink-400 font-bold")}>
            所有
          </NavLink>
          {category.data.map((item) => (
            <NavLink key={item.slug} to={`/gallery/${item.slug}`} className={({ isActive }) => clsn("inline-block px-3 py-1 mr-3 last:mr-auto", isActive && "text-pink-400 font-bold")}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </section>
      <section className="grid gap-4 lg:gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
        {media.data.map((item) => (
          <div key={item.id} className="relative bg-white rounded-xl overflow-hidden border-4 border-transparent hover:border-pink-400 transition-colors border-b-4 border-b-cyan-200">
            <img className={styles.image} src={item.thumb_url} alt={item.title} loading="lazy" />
            {item.content && (
              <div className={clsn("absolute top-0 left-0 right-0 bottom-0 bg-opacity-60 bg-black p-4 sm:p-6 text-white leading-7 transition-opacity duration-300 opacity-0 hover:opacity-100", styles.desc)}>
                {item.content}
              </div>
            )}
            <div className="p-4 sm:p-6 -mt-6 sm:-mt-12">
              <span className="block text-sm mb-4 opacity-60">{item.take_time.substring(0, 10)}</span>
              <h1 className="text-pink-400 text-xl sm:text-2xl font-bold text-ellipsis overflow-hidden">
                {item.title}
                {item.starred && (
                  <StarFill className=" text-yellow-400 w-6 h-6 inline-block ml-2 align-[-.1em]" />
                )}
              </h1>
            </div>
          </div>
        ))}
      </section>
      <section className="text-center">
        <Pagination current={Number(page)} size={20} total={media.count} onClick={onChangePage} />
      </section>
    </main>
  );
}
