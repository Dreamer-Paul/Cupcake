import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import Header from "./components/layout/header";
import Spinner from "./components/common/spinner";
import Footer from "./components/layout/footer";
import { siteTitle } from "~/utils";

import "./index.css";

export function ErrorBoundary() {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);

  const [statusCode, message] = (() => {
    if (isRouteError) {
      return [error.status, error.statusText];
    }

    if (error instanceof Error) {
      return [500, error.message];
    }

    return [500, "未知异常"];
  })();

  return (
    <html lang="zh-cmn-hans">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{siteTitle(statusCode)}</title>
        <Meta />
        <Links />
      </head>
      <body className="font-mi pt-16 bg-orange-50 text-neutral-600">
        <Header />
        <main className="px-2 py-24 max-w-3xl mx-auto">
          <h1 className="text-center text-5xl/tight md:text-7xl/tight mb-4">
            {statusCode}
          </h1>
          <p className="text-center opacity-60">{message}</p>
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "icon", href: "icon.png" },
  { rel: "stylesheet", href: "https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,450,500,600,650,700,900:Chinese_Simplify,Latin&display=swap" },
];

export default function App() {
  return (
    <html lang="zh-cmn-hans">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-mi pt-16 bg-orange-50 text-neutral-600">
        <Spinner />
        <Header />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
