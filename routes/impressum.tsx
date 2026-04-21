import { define } from "../utils.ts";
import { Nav } from "../components/Nav.tsx";

export default define.page(function Impressum(ctx) {
  ctx.state.title = "Impressum — RvR";

  return (
    <>
      <Nav />
      <h1 class="text-4xl font-bold mb-8">Impressum</h1>

      <div class="space-y-6 text-light-muted-foreground dark:text-dark-muted-foreground leading-relaxed">
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Angaben gemäß § 5 DDG
          </h2>
          <p>
            Reed von Redwitz<br />
            c/o COCENTER<br />
            Koppoldstr. 1<br />
            86551 Aichach
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Kontakt
          </h2>
          <p>
            E-Mail:{" "}
            <a href="mailto:reed@vonredwitz.com" class="underline">
              reed@vonredwitz.com
            </a>
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>
            Reed von Redwitz<br />
            c/o COCENTER<br />
            Koppoldstr. 1<br />
            86551 Aichach
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Haftung für Inhalte
          </h2>
          <p>
            Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann
            jedoch keine Gewähr übernommen werden. Als Diensteanbieter bin ich
            gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich
            als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
            gespeicherte fremde Informationen zu überwachen.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
            Haftung für Links
          </h2>
          <p>
            Dieses Angebot enthält Links zu externen Webseiten Dritter, auf
            deren Inhalte ich keinen Einfluss habe. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
          </p>
        </section>
      </div>
    </>
  );
});
