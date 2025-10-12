import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { useEffect } from "react";
import AuthProvider from "./provider/auth/authProvider";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=home,menu,orders",
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
  // Taken from https://blog.guya.net/2015/06/12/sharing-sessionstorage-between-tabs-for-secure-multi-tab-authentication/
  // This is a secure way to share sessionStorage between tabs.
  useEffect(() => {
    if (typeof window !== undefined) {
      // Ask other tabs for session storage (this is ONLY to trigger event)
      if (!sessionStorage.jwt) {
        /* console.log("Calling getSessionStorage"); */
        localStorage.setItem("getSessionStorage", String(Date.now()));
      }

      window.addEventListener("storage", (event: StorageEvent) => {
        console.log(event.key);
        if (event.key == "getSessionStorage") {
          /* console.log("set storage data", JSON.stringify(sessionStorage)); */
          // Some tab asked for the sessionStorage -> send it
          localStorage.setItem(
            "sessionStorage",
            JSON.stringify(sessionStorage),
          );
          // The other tab should now have it, so we're done with it.
          localStorage.removeItem("sessionStorage");
        } else if (event.key == "sessionStorage" && !sessionStorage.jwt) {
          // Another tab sent data <- get it
          const data = JSON.parse(event.newValue || "");
          /* console.log("get storage data", data); */

          for (let key in data) {
            sessionStorage.setItem(key, data[key]);
          }
        }
      });
    }
  }, []);

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
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
    <main id="error">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
