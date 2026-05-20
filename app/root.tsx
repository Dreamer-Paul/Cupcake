import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useRouteError,
} from "react-router";

import type { Route } from "./+types/root";
import { siteTitle } from "~/utils";

import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/icon.png" },
  {
    rel: "stylesheet",
    href: "https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,450,500,600,650,700,900:Chinese_Simplify,Latin&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const error = useRouteError();

  return (
    <html lang="zh-cmn-hans">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {isRouteErrorResponse(error) && error.status === 404 && <title>{siteTitle(error.status)}</title>}
        <Meta />
        <Links />
      </head>
      <body className="font-mi pt-16 bg-orange-50 text-neutral-600">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const navigate = useNavigate();

  let message = "啊哦";
  let details = "发生了未知的异常";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "404";
      details = "页面不存在";
    } else {
      details = error.statusText || details;
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="px-2 py-24 max-w-4xl mx-auto">
      <h1 className="text-center text-5xl/tight md:text-7xl/tight mb-2">
        {message}
      </h1>
      <p className="text-center opacity-60 mb-8">{details}</p>
      <p className="text-center">
        <button
          className="inline-block py-3 px-5 bg-pink-400 text-white rounded-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          返回首页
        </button>
      </p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
