import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { Post, getPosts } from "@/utils/posts.ts";

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <main class="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 class="text-5xl font-bold">Reed's Blog</h1>
      <div class="mt-8">
        {posts.map((post) => <PostCard post={post} />)}
      </div>
    </main>
  );
}

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="py-8 border(t gray-200)">
      <a class="sm:col-span-2" href={`/${post.slug}`}>
        <h3 class="text(3xl gray-900) font-bold">
          {post.title}
        </h3>
        <time class="text-gray-500">
          {new Date(post.date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div class="mt-4 text-gray-900">
          {post.description}
        </div>
        <div class="mt-4 text-gray-900">
          {post.draft}
        </div>
      </a>
    </div>
  );
}


export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

