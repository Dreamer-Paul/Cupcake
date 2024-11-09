import { Link, useLoaderData } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { siteTitle } from "~/utils";
import { ArrowDown, BiliBili, CloudMusic, GitHub, QQ, Steam, TwitterX } from "~/components/common/icons";

import styles from "./styles.module.less";

const year = new Date().getFullYear();

export const meta: MetaFunction = () => {
  return [
    { title: siteTitle() },
    { name: "description", content: "一只正在学习前后端技术的萌新" },
  ];
};

export async function loader() {
  const data = (await fetch("https://paul.ren/api/sync").then((res) =>
    res.json()
  )) as unknown as API.Response<API.Sync.ISyncData>;

  return { data };
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <main className="px-2 py-24 max-w-3xl mx-auto">
      <section className="-mt-40 relative flex flex-col h-screen min-h-[40rem] max-w-3xl mx-auto">
        <div className="my-auto px-4 py-10 bg-white rounded-xl text-center">
          <div className="mx-auto w-40 mb-10 relative select-none">
            <div className="top-4 left-2 w-36 h-36 rounded-full absolute bg-pink-100"></div>
            <img className={styles.avatar} src="/avatar.webp" alt="奇趣保罗" />
          </div>
          <h1 className="text-5xl mb-4">奇趣保罗</h1>
          <p className="opacity-60 mb-10">一只正在学习前后端技术的萌新</p>
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
          </p>
        </div>
        <ArrowDown className="absolute left-0 right-0 bottom-20 mx-auto w-10 h-10 opacity-60 animate-bounce" />
      </section>

      <section className="mb-16">
        <h2 className="text-3xl mb-4">近期博文</h2>
        <div className="bg-white rounded-xl p-5">
          {data.data.blog.map((item) => (
            <p key={item.link} className="flex mb-3 last:mb-0">
              <a className="flex-1" href={item.link} target="_blank" rel="noreferrer">{item.title}</a>
              <span className="font-mono opacity-50">{item.date}</span>
            </p>
          ))}
          </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl mb-4">近期日记</h2>
        <div className="bg-white rounded-xl p-5">
          {data.data.note.map((item) => (
            <p key={item.id} className="flex mb-3 last:mb-0">
              <Link className="flex-1" to={`/note/${year}/${item.id}`}>{item.title}</Link>
              <span className="font-mono opacity-50">{item.date}</span>
            </p>
          ))}
          </div>
      </section>

      <section>
        <h2 className="text-3xl mb-4">近期捕获</h2>
        <div className="bg-white rounded-xl p-5 grid grid-cols-2 gap-5">
          {data.data.media.map((item) => (
            <div key={item.id}>
              <img className="mb-3 rounded-xl" src={item.thumb_url} alt={item.title} />
              <h3 className="text-lg mb-1">{item.title}</h3>
              <p className="text-xs opacity-50">{item.take_time.substring(0, 10)}</p>
            </div>
          ))}
          </div>
      </section>
    </main>
  );
}
