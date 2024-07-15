import { NavLink } from "@remix-run/react";

const navItems = [
  { name: "首页", to: "/" },
  { name: "日记", to: "/note" },
  { name: "相册", to: "/gallery" },
  { name: "关于我", to: "/about" },
];

const inheritCls = "inline-block py-2 px-5";
const activeCls = "inline-block py-2 px-5 bg-orange-200 text-pink-400 rounded-xl";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-pink-400 text-white z-10">
      <nav className="py-3 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) => isActive ? activeCls : inheritCls}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
