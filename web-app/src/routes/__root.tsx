import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Moon, Sun } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { LoginButton } from "~/components/auth/LoginButton";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import { Button } from "~/components/ui/Button";
import { getCurrentUser } from "~/server/functions/auth";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Llama Jam",
        description: `Llama Jam is a song tablature library and player. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  beforeLoad: async () => {
    const currentUser = await getCurrentUser();
    return { currentUser };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  const { currentUser } = Route.useRouteContext();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const startDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (startDark) {
      document.documentElement.classList.add("dark");
      setIsDarkTheme(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkTheme((v) => !v);
  };

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="text-primary bg-accent">
        <div className="p-2 bg-background flex items-center justify-between">
          <div className="flex gap-4 text-lg">
            <Link
              to="/"
              activeProps={{
                className: "font-bold",
              }}
              activeOptions={{ exact: true }}
            >
              Home
            </Link>
            <Link
              to="/editor"
              activeProps={{
                className: "font-bold",
              }}
            >
              Editor
            </Link>
          </div>
          <div className="flex items-center gap-4 justify-end">
            <LoginButton currentUser={currentUser} />
            <Button variant="outline" size="icon-sm" onClick={toggleDarkMode}>
              {isDarkTheme ? <Sun /> : <Moon />}
            </Button>
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
