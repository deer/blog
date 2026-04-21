import { define } from "../utils.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(function Privacy(ctx) {
  ctx.state.title = "Privacy Policy — RvR";

  return (
    <>
      <Nav pathname={ctx.url.pathname} />
      <h1 class="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div class="space-y-6 text-light-muted-foreground dark:text-dark-muted-foreground leading-relaxed">
        <p class="text-sm">Last updated: April 2026</p>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Responsible Party
          </h2>
          <p>
            The party responsible for data processing on this website is listed
            in the{" "}
            <a href="/impressum" class="underline">Impressum</a>. For
            privacy-related inquiries, contact{" "}
            <a href="mailto:blog@vonredwitz.com" class="underline">
              blog@vonredwitz.com
            </a>.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Hosting
          </h2>
          <p>
            This website is hosted on{" "}
            <strong class="text-light-foreground dark:text-dark-foreground">
              Deno Deploy (Deno Land Inc.)
            </strong>, located on a global edge network. When you visit this
            site, your browser connects to their servers, which may log:
          </p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>IP address</li>
            <li>Date and time of the request</li>
            <li>Requested URL</li>
            <li>Browser type and version</li>
            <li>Referring URL</li>
          </ul>
          <p class="mt-2">
            This data is processed based on legitimate interest in providing a
            secure and functional website (Art. 6(1)(f) GDPR). As Deno Land Inc.
            is based in the United States, data transfers are covered by the
            EU-U.S. Data Privacy Framework and, where applicable, Standard
            Contractual Clauses (Art. 46(2)(c) GDPR).
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Analytics
          </h2>
          <p>
            This site uses{" "}
            <strong class="text-light-foreground dark:text-dark-foreground">
              server-side Umami analytics
            </strong>{" "}
            to understand usage patterns. Analytics run entirely on the server:
            no cookies are set in your browser, no client-side scripts are
            loaded, and no personally identifiable information is transmitted.
            The data sent to Umami includes the page path, hostname, browser
            language, and referrer.
          </p>
          <p class="mt-2">
            <strong class="text-light-foreground dark:text-dark-foreground">
              Legal basis:
            </strong>{" "}
            Art. 6(1)(f) GDPR (legitimate interest in understanding website
            usage).{" "}
            <a
              href="https://umami.is/privacy"
              target="_blank"
              rel="noopener"
              class="underline"
            >
              Umami's privacy policy
            </a>{" "}
            covers how they handle the data.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Cookies
          </h2>
          <p>
            This website does{" "}
            <strong class="text-light-foreground dark:text-dark-foreground">
              not
            </strong>{" "}
            use cookies. The only client-side storage used is{" "}
            <code>localStorage</code>{" "}
            to remember your light/dark theme preference. This data never leaves
            your browser.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Fonts
          </h2>
          <p>
            This website uses system fonts only. No connections to external font
            services (such as Google Fonts) are made when you visit.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Your Rights
          </h2>
          <p>Under GDPR, you have the right to:</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong class="text-light-foreground dark:text-dark-foreground">
                Access
              </strong>{" "}
              — request information about processed data (Art. 15)
            </li>
            <li>
              <strong class="text-light-foreground dark:text-dark-foreground">
                Rectification
              </strong>{" "}
              — correct inaccurate data (Art. 16)
            </li>
            <li>
              <strong class="text-light-foreground dark:text-dark-foreground">
                Erasure
              </strong>{" "}
              — request deletion (Art. 17)
            </li>
            <li>
              <strong class="text-light-foreground dark:text-dark-foreground">
                Restriction
              </strong>{" "}
              — restrict processing (Art. 18)
            </li>
            <li>
              <strong class="text-light-foreground dark:text-dark-foreground">
                Data portability
              </strong>{" "}
              — receive data in a portable format (Art. 20)
            </li>
            <li>
              <strong class="text-light-foreground dark:text-dark-foreground">
                Objection
              </strong>{" "}
              — object to processing based on legitimate interest (Art. 21)
            </li>
          </ul>
          <p class="mt-3">
            To exercise these rights, contact{" "}
            <a href="mailto:blog@vonredwitz.com" class="underline">
              blog@vonredwitz.com
            </a>. You also have the right to lodge a complaint with a
            supervisory authority (Art. 77 GDPR).
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Changes
          </h2>
          <p>
            This privacy policy may be updated from time to time. The date above
            will be revised accordingly.
          </p>
        </section>
      </div>
    </>
  );
});
