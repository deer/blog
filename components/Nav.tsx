import ThemeToggle from "../islands/ThemeToggle.tsx";

const links = [
  { href: "/about", label: "About" },
  { href: "/archive", label: "Archive" },
  { href: "/contact", label: "Contact" },
  { href: "/projects", label: "Projects" },
] as const;

function isCurrent(pathname: string | undefined, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Nav({ pathname }: { pathname?: string } = {}) {
  return (
    <nav class="flex items-center justify-between pb-6 mb-10 border-b border-light-muted-background dark:border-dark-muted-background">
      <a href="/" class="text-xl font-bold tracking-tight">
        RvR
      </a>
      <div class="flex items-center gap-5">
        {links.map(({ href, label }) => {
          const current = isCurrent(pathname, href);
          return (
            <a
              key={href}
              href={href}
              aria-current={current ? "page" : undefined}
              class={`text-sm transition-colors ${
                current
                  ? "text-light-foreground dark:text-dark-foreground font-semibold"
                  : "text-light-muted-foreground dark:text-dark-muted-foreground hover:text-light-foreground dark:hover:text-dark-foreground"
              }`}
            >
              {label}
            </a>
          );
        })}
        <ThemeToggle />
      </div>
    </nav>
  );
}
