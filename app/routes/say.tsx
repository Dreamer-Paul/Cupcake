import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ThumbUpFill } from "~/components/ui/icons";
import Pagination from "~/components/ui/pagination";
import { add } from "~/components/ui/notice/utils";
import { clsn, siteTitle } from "~/utils";

import type { Route } from "./+types/say";

import styles from "./say.module.css";

const PAGE_SIZE = 20;
const DESCRIPTION = "奇趣保罗的个人语录，以及一些高赞评论";

function formatAuthor(item: API.Say.ISayData) {
  if (item.origin && item.author) {
    return `出自 “${item.origin}”，作者：${item.author}`;
  }

  if (item.origin) {
    return `出自 “${item.origin}”`;
  }

  if (item.author) {
    return `作者：${item.author}`;
  }

  return "";
}

export function meta({ loaderData }: Route.MetaArgs) {
  const title = siteTitle("语录");

  return [
    { title },
    { name: "description", content: DESCRIPTION },
    { property: "og:title", content: title },
    { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" },
    { property: "og:url", content: loaderData?.canonical },
    { tagName: "link", rel: "canonical", href: loaderData?.canonical },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";

  const say = (await fetch(`https://paul.ren/api/say/page?page=${page}`).then((res) =>
    res.json()
  )) as API.PageResponse<API.Say.ISayData[]>;

  const canonical = new URL(url);

  if (page === "1") {
    canonical.searchParams.delete("page");
  }

  return { say, page, canonical: canonical.href };
}

export default function Say({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { say, page } = loaderData;
  const [items, setItems] = useState(say.data);

  useEffect(() => {
    setItems(say.data);
  }, [say.data]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  const onChangePage = (value: number) => {
    navigate({
      search: value > 1 ? `?page=${value}` : "",
    });
  };

  const onLike = async (target: HTMLButtonElement, id: number, index: number) => {
    target.classList.add(styles.likeActive);

    setItems((prevItems) => {
      const nextItems = [...prevItems];
      nextItems[index] = {
        ...nextItems[index],
        likes: nextItems[index].likes + 1,
      };
      return nextItems;
    });

    const formData = new FormData();
    formData.append("id", String(id));

    const res = (await fetch("https://paul.ren/api/say/like", {
      method: "POST",
      body: formData,
    }).then((response) => response.json())) as API.Response<null>;

    if (res.status === "Success") {
      add({
        title: "点赞成功",
        content: res.msg,
      });
    } else {
      add({
        title: "点赞失败",
        content: res.msg,
      });

      setItems((prevItems) => {
        const nextItems = [...prevItems];
        nextItems[index] = {
          ...nextItems[index],
          likes: nextItems[index].likes - 1,
        };
        return nextItems;
      });
    }
  };

  return (
    <main className="px-2 py-24 max-w-4xl mx-auto">
      <section className="mb-12">
        <h1 className="text-center text-5xl/tight md:text-7xl/tight">语录</h1>
      </section>
      <section className="columns-1 md:columns-2 mb-12">
        {items.map((item, index) => {
          const author = formatAuthor(item);

          return (
            <blockquote
              key={item.id}
              className={clsn(
                styles.item,
                "group p-5 bg-white rounded-xl border-4 border-transparent border-b-cyan-200 border-l-4 transition-colors whitespace-pre-wrap",
                "break-inside-avoid mb-4",
              )}
            >
              <p className="mb-4 leading-relaxed">{item.content}</p>
              <p className="flex items-center gap-3 text-sm italic opacity-60">
                <button
                  type="button"
                  className={clsn(styles.like, "opacity-0 group-hover:opacity-60 transition-opacity relative inline-flex items-center not-italic cursor-pointer mr-auto")}
                  onClick={(ev) => onLike(ev.currentTarget, item.id, index)}
                >
                  <ThumbUpFill className="h-4 w-4 mr-1" />
                  {item.likes}
                </button>
                {author && <span>{author}</span>}
              </p>
            </blockquote>
          );
        })}
      </section>
      <section className="text-center">
        <Pagination
          current={Number(page)}
          size={PAGE_SIZE}
          total={say.count}
          onClick={onChangePage}
        />
      </section>
    </main>
  );
}
