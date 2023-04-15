---
title: "90days: Day 10 -- Loopback"
#description: 
date: 2023-04-15 19:55
---

Welcome back to "90 Day of Tutorials". Today I tried out [Loopback](https://loopback.io/index.html). They describe themselves as:
> A highly extensible Node.js and TypeScript framework for building APIs and microservices.

I made it through the following:
* [Getting Started](https://loopback.io/getting-started.html)
* [Todo tutorial](https://loopback.io/doc/en/lb4/todo-tutorial.html)
* [TodoList tutorial](https://loopback.io/doc/en/lb4/todo-list-tutorial.html)

Perhaps the coolest thing is that their documentation introduced me to [https://diataxis.fr/](https://diataxis.fr/), which is a mental framework for thinking about technical documentation. Really thankful for this link, since it provides mind-blowing clarity to how to organize and think about documentation.

That being said, the Loopback documentation seems to be pretty well organized. I particularly enjoyed the "Getting Started", since it's only six steps long, and each step is very clearly delineated. Great.

The Todo and TodoList tutorials are coupled: that is, the TodoList builds on the Todo. It's really well structured in terms of introducing me to the concepts and the experience of building it is nice as well.


My big complete is that `pnpm` doesn't seem to be supported, and even `npm` doesn't work out of the box. I had to install some packages with the following:
```
npm i --save-dev @types/jest
npm i --save-dev @types/mocha
```

But other than that, I thought this was a really well thought-out introduction. I will definitely read through their [Build large scale Node.js projects with LoopBack](https://loopback.io/doc/en/lb4/core-tutorial.html) to see how they think about these sorts of problems. A quick glance at their [Concepts](https://loopback.io/doc/en/lb4/Concepts.html) page invites me for more reading as well.

They really know what they're doing on the documentation front. But somehow I'm a bit... underwhelmed? I'm not sure how I heard of Loopback, but it's not at all frequently mentioned. Is it a dying framework? Does anyone actually use it? The interwebs seem to suggest that vanilla Express is fine. Who knows. I've definitely learned lots here already, so at minimum it was good for that.

An interesting project would be to build two microservices with Loopback which talk to each other via [Temporal](/blog/90days-day-9-temporal).
