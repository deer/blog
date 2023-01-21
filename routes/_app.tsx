import { AppProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <main class="max-w-screen-md px-4 pt-16 mx-auto">
        <Header title="" active="/" />
        <Component />
      </main>
    </>
  );
}
