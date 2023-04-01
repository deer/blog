---
title: "90days: Day 6 -- Prisma"
#description: 
date: 2023-04-01 10:30
---

One of the things I've been very interested in at work is developer productivity and developer relations. It's not something we've done a good job at for our internal developer ecosystem. I'm wondering if I should start transforming this "90 days of tutorials" project into some sort of review of developer tooling documentation.

Ok, enough thinking out loud for now. Busy day preparing for the movers tomorrow. Here we are with [Prisma](https://www.prisma.io/) which is a
> Next-generation Node.js and TypeScript ORM

I wonder if everything is always next-generation, does the word stop meaning anything?

Anyway, they have a pretty good [getting started](https://www.prisma.io/docs/getting-started/quickstart) guide which walks through the fundamental concepts of Prisma. One thing which is sadly missing is a practical example of using migrations. When we create the initial schema, they mention that it runs a database migration. That's great, but it's also not necessarily what I would consider a migration. I would want to see some initial schema, and then migrate to a new one. But ok, I suppose it's just a getting started guide.

At the end they do have a section [Build an app with Prisma](https://www.prisma.io/docs/getting-started/quickstart#build-an-app-with-prisma) which links to two tutorials that go into more detail about actually using Prisma. Overall I suppose I actually really like this style of tutorial. They've separated all the Prisma-specific stuff into the getting started guide, which nicely introduces the concepts. Then, they provide some links to other tutorials which actaully applies the concepts in the real world.

I'm reminded of my Earthly experience where I wrote:
> I think the only way the experience could be enhanced is if they included more of a real world use case.

I think Earthly followed a similar pattern to Prisma where they have a nice getting started, but no guide to apply the concepts. I haven't followed the tutorials that Prisma provides, but it seems like they're doing what I wish Earthly did.

Overall a good experience and I am definitely ready to use Prisma to actually do something.
