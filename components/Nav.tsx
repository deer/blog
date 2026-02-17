import ThemeToggle from "../islands/ThemeToggle.tsx";

const links = [
  { href: "/about", label: "About" },
  { href: "/archive", label: "Archive" },
  { href: "/contact", label: "Contact" },
  { href: "/projects", label: "Projects" },
] as const;

export function Nav() {
  return (
    <nav class="flex items-center justify-between pb-6 mb-10 border-b border-light-muted-background dark:border-dark-muted-background">
      <a href="/" class="text-xl font-bold tracking-tight">
        RvR
      </a>
      <div class="flex items-center gap-5">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            class="text-sm text-light-muted-foreground dark:text-dark-muted-foreground hover:text-light-foreground dark:hover:text-dark-foreground transition-colors"
          >
            {label}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
