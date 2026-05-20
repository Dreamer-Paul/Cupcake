import { Link } from "react-router";

import {
  ArrowDown,
  BiliBili,
  CloudMusic,
  GitHub,
  QQ,
  Steam,
  TwitterX,
  Feed,
} from "~/components/ui/icons";
import { siteTitle } from "~/utils";
import { getImageThumbUrl } from "~/utils/media";

import type { Route } from "./+types/index";

import styles from "./index.module.css";

const year = new Date().getFullYear();

export function meta({}: Route.MetaArgs) {
  return [
    { title: siteTitle() },
    { name: "description", content: "一只正在学习前后端技术的萌新" },
  ];
}

export async function loader() {
  const data = (await fetch("https://paul.ren/api/sync").then((res) =>
    res.json()
  )) as unknown as API.Response<API.Sync.ISyncData>;

  return { data };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;

  return (
    <main className="px-2 py-24">
      <section className="-mt-40 relative flex flex-col h-screen min-h-160 max-w-4xl mx-auto">
        <div className="my-auto text-center">
          <div className="mx-auto w-40 mb-12 relative select-none">
            <div className="top-4 left-2 w-36 h-36 rounded-full absolute bg-pink-100"></div>
            <img className={styles.avatar} src="/avatar.webp" alt="奇趣保罗" />
          </div>
          <h1 className="text-5xl md:text-7xl mb-4">奇趣保罗</h1>
          <p className="opacity-60 mb-12">一只正在学习前后端技术的萌新</p>
          <p className="flex justify-center gap-3">
            <a href="https://paul.ren/join-group" target="_blank" rel="noreferrer" title="企鹅群">
              <QQ className="w-6" />
            </a>
            <a href="https://github.com/Dreamer-Paul" target="_blank" rel="noreferrer" title="GitHub">
              <GitHub className="w-6" />
            </a>
            <a href="https://music.163.com/#/user/home?id=7041859" target="_blank" rel="noreferrer" title="网易云">
              <CloudMusic className="w-6" />
            </a>
            <a href="https://x.com/Dreamer__Paul" target="_blank" rel="noreferrer" title="X">
              <TwitterX className="w-6" />
            </a>
            <a href="https://space.bilibili.com/124512959" target="_blank" rel="noreferrer" title="哔哩哔哩">
              <BiliBili className="w-6" />
            </a>
            <a href="https://steamcommunity.com/id/dreamer-paul" target="_blank" rel="noreferrer" title="Steam">
              <Steam className="w-6" />
            </a>
            <a href="https://paul.ren/feed" target="_blank" title="订阅 RSS">
              <Feed className="w-6" />
            </a>
          </p>
        </div>
        <ArrowDown className="absolute left-0 right-0 bottom-20 mx-auto w-10 h-10 opacity-60 animate-bounce" />
      </section>

      <section className="max-w-4xl mx-auto mb-24">
        <h2 className="text-5xl text-center mb-10">近期博文</h2>
        <div className="grid grid-cols-2 gap-5">
          {data.data.blog.map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              className="flex flex-col bg-white rounded-xl p-5 border-4 border-transparent hover:border-pink-400 transition-colors border-b-cyan-200"
            >
              <h3 className="text-pink-400 text-xl font-semibold truncate mb-4">{item.title}</h3>
              <p className="text-sm leading-relaxed flex-1 line-clamp-2 mb-4">{item.content}</p>
              <span className="text-sm opacity-50">{item.date}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-24">
        <h2 className="text-5xl text-center mb-10">近期日记</h2>
        <div className="grid grid-cols-2 gap-5">
          {data.data.note.map((item) => (
            <Link
              key={item.id}
              to={`/note/${year}/${item.id}`}
              className="flex flex-col bg-white rounded-xl p-5 border-4 border-transparent hover:border-pink-400 transition-colors border-b-cyan-200"
            >
              <h3 className="text-pink-400 text-xl font-semibold truncate mb-4">{item.title}</h3>
              <p className="text-sm leading-relaxed flex-1 line-clamp-2 mb-4">{item.except}</p>
              <span className="text-sm opacity-50">{item.date}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto">
        <h2 className="text-5xl text-center mb-10">近期捕获</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {data.data.media.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden bg-white rounded-xl border-4 border-transparent hover:border-pink-400 transition-colors border-b-cyan-200 cursor-pointer"
            >
              <img className="w-full aspect-4/3 object-cover" src={getImageThumbUrl(item.url)} alt={item.title} />
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-pink-400 text-xl font-semibold flex-1 truncate mb-4">{item.title}</h3>
                <p className="text-sm opacity-50">{item.take_time.substring(0, 10)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
