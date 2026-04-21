import { effect, signal } from "@preact/signals";

const isDark = signal(false);
const mounted = signal(false);

effect(() => {
  if (!mounted.value) return;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
});

export default function ThemeToggle() {
  if (typeof document !== "undefined" && !mounted.value) {
    const stored = localStorage.getItem("theme");
    const prefersDark =
      globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
    isDark.value = stored === "dark" || (!stored && prefersDark);
    mounted.value = true;
  }

  const sunClass = mounted.value
    ? (isDark.value ? "block" : "hidden")
    : "hidden dark:block";
  const moonClass = mounted.value
    ? (isDark.value ? "hidden" : "block")
    : "block dark:hidden";

  return (
    <button
      type="button"
      onClick={() => (isDark.value = !isDark.value)}
      class="text-light-muted-foreground dark:text-dark-muted-foreground hover:text-light-foreground dark:hover:text-dark-foreground transition-colors"
      aria-label="Toggle dark mode"
    >
      <svg
        class={sunClass}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg
        class={moonClass}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
