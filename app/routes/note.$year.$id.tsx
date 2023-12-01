import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Article from "~/components/common/article";
import { siteTitle } from "~/utils";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? siteTitle(data.data.title) : "404" },
    { name: "description", content: data?.data.except },
  ];
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (Number.isNaN(Number(params.year)) || Number.isNaN(Number(params.id))) {
    throw json("Not Found", { status: 404, statusText: "链接格式错误" });
  }

  const note = await fetch(`https://paul.ren/api/note/get?id=${params.id}&year=${params.year}`).then((res) => res.json()) as API.Response<API.Note.INoteData>;

  if (note.status === "Failed") {
    throw json("Not Found", { status: 404, statusText: note.msg });
  }

  return json(note);
}

export default function Detail() {
  const note = useLoaderData<typeof loader>();

  return (
    <main className="px-2 py-24 max-w-3xl mx-auto">
      <section className="mb-12">
        <h1 className="text-center text-5xl/tight md:text-7xl/tight mb-4">{note.data.title}</h1>
        <p className="text-center opacity-60">{note.data.date}</p>
      </section>
      <section className="p-5 bg-white rounded-xl border-b-4 border-b-cyan-200">
        <Article html={note.data.content_html} />
      </section>
    </main>
  );
};
