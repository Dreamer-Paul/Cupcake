import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Article from "~/components/common/article";
import { CupFill, ShareFill, ThumbUpFill } from "~/components/common/icons";
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

  const [likes, setLikes] = useState(note.data.likes);

  const onLike = () => {
    setLikes((prevLike) => prevLike + 1);
  }

  const onShare = () => {
    const shareData = {
      title: note.data.title,
      text: note.data.except,
      url: `${location.protocol}//${location.host}${location.pathname}`,
    };

    if ("share" in navigator) {
      navigator.share(shareData);
    }
    else {
      alert("当前操作系统尚未实现此 API");
    }
  }

  return (
    <main className="px-2 py-24 max-w-3xl mx-auto">
      <section className="mb-12">
        <h1 className="text-center text-5xl/tight md:text-7xl/tight mb-4" style={{ viewTransitionName: `note-title-${note.data.id}` }}>
          {note.data.title}
        </h1>
        <p className="text-center opacity-60">{note.data.date}</p>
      </section>
      <section className="p-5 bg-white rounded-xl border-b-4 border-b-cyan-200 mb-8">
        <Article html={note.data.content_html} />
      </section>
      <section className="flex gap-16 items-center justify-center text-base md:text-lg">
        <button onClick={onLike}>
          <ThumbUpFill className="inline-block h-8 w-8 mr-2" />
          {likes}
        </button>
        <button onClick={onShare}>
          <ShareFill className="inline-block h-8 w-8 mr-2" />
          分享
        </button>
        <button>
          <CupFill className="inline-block h-8 w-8 mr-2" />
          打赏
        </button>
      </section>
    </main>
  );
};
