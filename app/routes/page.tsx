import Article from "~/components/common/article";
import { siteTitle } from "~/utils";

import type { Route } from "./+types/page";

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData ? siteTitle(loaderData.data.title) : "404" },
    { name: "description", content: loaderData?.data.desc },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params["*"];

  const page = (await fetch(
    `https://paul.ren/api/page/get?slug=${slug}&html`,
  ).then((res) => res.json())) as API.Response<API.Page.IPageData>;

  if (page.status === "Failed") {
    throw new Response("Not Found", { status: 404 });
  }

  return page;
}

export default function DynamicPage({ loaderData }: Route.ComponentProps) {
  const page = loaderData;

  return (
    <main className="px-2 py-24 max-w-4xl mx-auto">
      <section className="mb-12">
        <h1 className="text-center text-5xl/tight md:text-7xl/tight mb-4">{page.data.title}</h1>
        <p className="text-center opacity-60">{page.data.desc}</p>
      </section>
      <section className="p-5 md:p-12 bg-white rounded-xl border-b-4 border-b-cyan-200">
        <Article html={page.data.content} />
      </section>
    </main>
  );
}
