(function () {
  let stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch {
    // localStorage may be blocked (private mode, disabled storage)
  }
  const prefersDark =
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
  if (stored === "dark" || (!stored && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})();
