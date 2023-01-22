export default function NavigationBar(
  props: { active: string; class?: string },
) {
  const items = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Projects", href: "/projects" },
  ];
  const isHome = props.active == "/";
  return (
    <nav class={"flex " + props.class ?? ""}>
      <div class="text-5xl font-bold pr-20">Reed's Blog</div>
      <ul class="flex justify-center items-center gap-4 mx-4 my-6 flex-wrap">
        {items.map((item) => (
          <li>
            {/*the active stuff isn't working right now, due to https://github.com/denoland/fresh/issues/663*/}
            {/* <a
              href={item.href}
              class={`p-2 ${
                isHome ? "text-black-900" : "text-gray-600"
              } hover:underline ${
                props.active == item.href ? "font-bold" : ""
              }`}
            >
              {item.name}
            </a> */}
            <a href={item.href} class={`p-2`}>{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
