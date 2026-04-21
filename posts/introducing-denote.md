---
title: "Your documentation site should be an MCP server"
description: "Introducing Denote, an AI-native documentation framework for Deno. Why I built it, what it does, and why I'm not building a hosted version."
date: 2026-04-21
author: Reed von Redwitz
order: 1
series: spring-run
tags:
  - denote
  - documentation
  - agents
---

I contributed to [Fresh](https://fresh.deno.dev/) in 2023 and 2024. Working on a
general web framework was cool, but I've always been more interested in
documentation. The whole time I kept thinking: where is the Deno-native
documentation framework? There wasn't one.

Fast forward a couple of years. I got openclaw running on a home server and
wanted to take it for a test drive. Out popped the first pass of
[Denote](https://denote.sh/). Most of the work since then has been a mix of
Claude Code and manual testing.

The AI-native angle came while I was using Claude Code and openclaw to build the
thing. They kept needing to look things up, and I realized documentation sites
have two consumers -- humans and agents -- but they're only serving one of them.
And then: wait, I'm building a documentation framework. What if it was
AI-native?

## What AI-native actually means

AI-native documentation means treating agents as first-class citizens, on equal
footing with humans. Humans get nice UI pages. Agents get nice programmatic
access. Most frameworks don't do this. Denote does.

Concretely: your documentation site _is_ an MCP server. It also serves
`llms.txt`, `llms-full.txt`, `sitemap.xml`, `/api/docs/`, and `/api/search/`.
Programmatic access used to be an afterthought. With Denote it's the point.

You can see the shape of this on my own blog. Go to
[reed.vonredwitz.com/llms.txt](https://reed.vonredwitz.com/llms.txt). That's
what an agent sees. Every site should have this.

## The opinionated part

Agents will be the primary consumer of documentation in the future. If your
documentation platform is targeting humans, your product is going to lose. Agent
traffic will outnumber human traffic in a developer's docs workflow before most
teams realize it.

If you write docs for anything developers touch, you're the audience for Denote.

## Try it

`deno run -Ar jsr:@denote/init` scaffolds a project. Run `deno task dev` and
explore the endpoints. Thirty seconds, start to finish. Configure your agent of
choice to target the local MCP server if you want more.

Curious how it works? It's on JSR at [@denote/core](https://jsr.io/@denote/core)
and on GitHub at [deer/denote](https://github.com/deer/denote).

Want to see it in your browser before checking anything out?
[denote.sh](https://denote.sh/) is created using Denote. Proof:

- https://denote.sh/llms.txt
- https://denote.sh/api/docs
- https://denote.sh/mcp (doesn't work in a browser, but appropriately responds)
- https://denote.sh/sitemap.xml

## What I'm not building

At first I thought Denote could be a classic open-core play: ship the framework
as open source, build a hosted version on the side. But I'm happily employed and
I'm a father of a toddler. There isn't time for product marketing and side
hustles on top of building. Founding isn't an option right now.

So Denote is open source. That's the whole project. If you want a hosted
version, self-host it -- it's MIT. [Deno Deploy](https://deno.com/deploy) makes
it [trivial](https://docs.deno.com/deploy/reference/frameworks/#fresh-(fresh))
to deploy a site built with Fresh (what Denote is built on).

## What's next

I'll be using Denote to document the rest of the open source work I've been
doing. Spoiler: most of it is targeted at agents. The documentation needs to
match.
