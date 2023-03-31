---
title: "90days: Day 5 -- Blitz"
#description: 
date: 2023-03-31 07:25
---

Right, now we're "cooking with hot oil" as a friend once said. [Blitz](https://blitzjs.com/) describes itself as:
> Blitz picks up where Next.js leaves off, providing battle-tested libraries and conventions for shipping and scaling world wide applications.

Their [tutorial](https://blitzjs.com/docs/tutorial) is pretty nice, especially since it seems to be building the same app as what Django offers: a simple question app where each question has some choices, and the choices can be voted for.

Blitz supports user authentication by default, but sadly the tutorial doesn't cover this functionality. The model they've set up naturally lends itself to having a security feature: admins can configure questions, and users should be able to vote. Right now the same person can vote for multiple choices on a single question, multiple times (just mash that vote button). I would have hoped to see this included, since this is the cornerstone of application development. The [auth page](https://blitzjs.com/docs/auth) doesn't include any sort of integrated tutorial. Perhaps something to add!

On the topic of auth, they mention that it's built with [Supertokens](https://supertokens.com/), some sort of open source user authentication framework. One other thing to add to the list of stuff to learn.

Blitz fortunately makes use of [Prisma](https://www.prisma.io/) for its ORM stuff. That's cool, but I'm also not familiar with that. So it seems like the path forward here is pretty clear. The next three things should probably be:
1. Next
2. Prisma
3. Supertokens

With those three pieces in place, maybe I can then successfully leverage Blitz to create some microservices as mentioned [here](/blog/2023-03-26#spring-tutorial) (ok, there I mention using Deno, but whatever). If I had such microservices, then it seems like that would be a possible path forward to using some of the previous tools I learned about: Turborepo, Earthly, and finally Kubernetes.

Wow, there's just so many choices available. Onwards and upwards!
