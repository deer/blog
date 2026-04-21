import { define, SITE } from "../utils.ts";
import { Nav } from "../components/Nav.tsx";

type SchemaType = "SoftwareSourceCode" | "Service";

interface Project {
  id?: string;
  name: string;
  repo?: string;
  site?: { href: string; label: string };
  status?: string;
  blurb: string;
  schemaType?: SchemaType;
}

interface Section {
  heading: string;
  intro?: preact.ComponentChildren;
  projects: Project[];
}

const SECTIONS: Section[] = [
  {
    heading: "The *.build ecosystem",
    intro: (
      <>
        A stack. base is the foundation; codemodel depends on base, spawn on
        those two, serve on those three, and spin on all four. Four I contribute
        to at Workday; serve.build is mine.
      </>
    ),
    projects: [
      {
        name: "base.build",
        repo: "https://github.com/Workday/base.build",
        blurb:
          "Foundation utilities across 26 JPMS modules: marshalling, configuration, reactive flow, graph algorithms, query, mereology, retry, telemetry, CLI parsing, version handling. The shared primitives everything else is built on.",
      },
      {
        name: "codemodel.build",
        repo: "https://github.com/Workday/codemodel.build",
        blurb:
          "A language-agnostic framework for representing software systems as a structured, serializable model. A CodeModel can be populated from compiled classes or .java source, then enriched, validated, and compiled through a plugin pipeline. The basis for annotation processors and code generation.",
      },
      {
        name: "spawn.build",
        repo: "https://github.com/Workday/spawn.build",
        blurb:
          "Programmatically launch and control processes, JVMs, and Docker containers. One abstraction (Platform, Application, Process) across all three. Define a Specification, launch it, get CompletableFuture lifecycle hooks back.",
      },
      {
        name: "spin.build",
        repo: "https://github.com/Workday/spin.build",
        blurb:
          "A script-free Java 25 build system. Inspects project structure through pluggable extensions, infers what to build, and runs the resulting dependency graph of tasks. Self-hosting.",
      },
      {
        name: "serve.build",
        site: { href: "https://serve.build", label: "serve.build" },
        repo: "https://github.com/deer/serve.build",
        blurb:
          "HTTP for Java 25. Virtual threads, structured concurrency, zero magic.",
      },
    ],
  },
  {
    heading: "Domain demos",
    projects: [
      {
        id: "music",
        name: "music.build",
        site: { href: "https://music.build", label: "music.build" },
        repo: "https://github.com/deer/music.build",
        blurb:
          "MCP server for AI music composition. A typed, immutable music theory library covering pitches, rhythms, harmony, form, and transforms. Agents compose incrementally and export to MIDI and LilyPond.",
      },
    ],
  },
  {
    heading: "Documentation",
    projects: [
      {
        name: "Denote",
        site: { href: "https://denote.sh", label: "denote.sh" },
        repo: "https://github.com/deer/denote",
        blurb:
          "An AI-native documentation framework. Docs structured so an agent can find what it needs without scraping prose, and so humans reading the same pages get a clear narrative too.",
      },
      {
        name: "Denote Cloud",
        site: { href: "https://denote.cloud", label: "denote.cloud" },
        schemaType: "Service",
        blurb:
          "A hosted version I've thought about but am not building right now. Join the waitlist if you want to be told when that changes.",
      },
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const meta: preact.ComponentChildren[] = [];
  if (project.site) {
    meta.push(
      <a href={project.site.href} class="underline">{project.site.label}</a>,
    );
  }
  if (project.repo) {
    meta.push(<a href={project.repo} class="underline">repo</a>);
  }
  if (project.status) meta.push(<>{project.status}</>);

  return (
    <article id={project.id} class="mb-8">
      <h3 class="text-lg font-semibold mb-1">{project.name}</h3>
      {meta.length > 0 && (
        <p class="text-sm text-light-muted-foreground dark:text-dark-muted-foreground mb-2">
          {meta.map((m, i) => (
            <span key={i}>
              {i > 0 && " · "}
              {m}
            </span>
          ))}
        </p>
      )}
      <p>{project.blurb}</p>
    </article>
  );
}

export default define.page(function ProjectsPage(ctx) {
  ctx.state.title = "Projects — RvR";
  ctx.state.description =
    "The *.build Java 25 ecosystem, domain demos on top of it, and the Denote documentation framework.";

  const projectsUrl = `${SITE.url}/projects`;
  const allProjects = SECTIONS.flatMap((s) => s.projects);
  ctx.state.structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${projectsUrl}#page`,
        url: projectsUrl,
        name: "Projects",
        description: ctx.state.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE.url}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: allProjects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": p.schemaType ?? "SoftwareSourceCode",
              name: p.name,
              description: p.blurb,
              ...(p.site?.href ? { url: p.site.href } : {}),
              ...(p.repo ? { codeRepository: p.repo } : {}),
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: projectsUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Nav pathname={ctx.url.pathname} />
      <h1 class="text-4xl font-bold mb-2">Projects</h1>
      <p class="text-light-muted-foreground dark:text-dark-muted-foreground mb-12 max-w-prose">
        A modular Java 25 ecosystem, domain demos built on top of it, and a
        documentation framework alongside.
      </p>

      {SECTIONS.map((section) => (
        <section key={section.heading} class="mb-16 max-w-prose">
          <h2 class="text-2xl font-semibold mb-3">{section.heading}</h2>
          {section.intro && (
            <p class="text-light-muted-foreground dark:text-dark-muted-foreground mb-8">
              {section.intro}
            </p>
          )}
          {section.projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </section>
      ))}
    </>
  );
});
