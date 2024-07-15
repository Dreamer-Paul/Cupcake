import type { MetaFunction } from "@remix-run/node";
import { siteTitle } from "~/utils";
import { BiliBili, CloudMusic, GitHub, QQ, Steam, TwitterX } from "~/components/common/icons";

import styles from "./styles.module.less";

export const meta: MetaFunction = () => {
  return [
    { title: siteTitle() },
    { name: "description", content: "一只正在学习前后端技术的萌新" },
  ];
};

export default function Index() {
  return (
    <main className="px-2 py-24">
      <section className="flex flex-col h-[60vh] max-w-2xl mx-auto">
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
      </section>
    </main>
  );
}
