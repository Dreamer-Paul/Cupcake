import { NavLink } from "react-router";
import { Feed, GitHub, QQ } from "../ui/icons";
import { clsn } from "~/utils";

const navItems = [
  { name: "首页", to: "/" },
  { name: "日记", to: "/note" },
  { name: "相册", to: "/gallery" },
  { name: "关于我", to: "/about" },
];

const inheritCls = "hover:text-pink-400";
const activeCls = "bg-pink-300 text-white rounded-xl hover:border-pink-400 border-b-pink-400";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-orange-50 z-10 flex justify-between items-center px-2 md:px-6 py-4">
      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              clsn(
                "inline-block font-semibold py-2 px-4",
                "border-4 border-transparent transition-colors",
                isActive ? activeCls : inheritCls
              )
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <nav className="flex items-center gap-2 [&>a]:hover:text-pink-400 [&>a]:transition-colors">
        <a href="https://paul.ren/join-group" target="_blank" rel="noreferrer" title="企鹅群">
          <QQ className="w-5" />
        </a>
        <a href="https://github.com/Dreamer-Paul" target="_blank" rel="noreferrer" title="GitHub">
          <GitHub className="w-5" />
        </a>
        <a href="https://paul.ren/feed" target="_blank" title="订阅 RSS">
          <Feed className="w-5" />
        </a>
      </nav>
    </header>
  );
}

export default Header;
