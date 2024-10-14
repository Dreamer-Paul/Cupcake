import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Article from "~/components/common/article";
import { siteTitle } from "~/utils";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? siteTitle(data.data.title) : "404" },
    { name: "description", content: data?.data.desc },
  ];
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params["*"];

  const page = await fetch(`https://paul.ren/api/page/get?slug=${slug}&html`).then((res) => res.json()) as API.Response<API.Page.IPageData>;

  if (page.status === "Failed") {
    throw json("Not Found", { status: 404, statusText: page.msg });
  }

  return page;
}

export default function DynamicPage() {
  const page = useLoaderData<typeof loader>();

  return (
    <main className="px-2 py-24 max-w-3xl mx-auto">
      <section className="mb-12">
        <h1 className="text-center text-5xl/tight md:text-7xl/tight mb-4">{page.data.title}</h1>
        <p className="text-center opacity-60">{page.data.desc}</p>
      </section>
      <section className="p-5 bg-white rounded-xl border-b-4 border-b-cyan-200">
        <Article html={page.data.content} />
      </section>
    </main>
  );
}
