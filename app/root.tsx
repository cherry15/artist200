import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Menu from "./menu/menu";
import Square from "./square/square";
import { ArtistProvider } from "./artistReducer";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  let location = useLocation();
  return (
    <ArtistProvider>
      <div className="flex flex-col md:flex-row">
        <header className="flex pt-4 pb-4 pl-8 pr-8 h-[100px] md:h-auto md:w-[200px] md:flex-row md:content-start md:flex-wrap">
          <div className="flex-1">
            <p className="uppercase font-serif text-stone-400 text-[2rem]">
              Artist200
            </p>
            <p className="text-stone-300 italic text-sm">Cheryl Collier</p>
          </div>
          <div className="flex-1">
            <Menu />
            <Square />
          </div>
        </header>
        <main className="px-8 pt-2 overflow-hidden md:pt-4">
          <Outlet />
        </main>
      </div>
    </ArtistProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
