---
title: "90days: Day 4 -- Earthly"
#description: 
date: 2023-03-30 20:08
---

Cool, so I'm getting into the groove. Today I learned a bit about [Earthly](https://docs.earthly.dev/basics), which, well, they say it best:
> Earthly is a super simple CI/CD framework that gives you repeatable builds that you write once and run anywhere; has a simple, instantly recognizable syntax; and works with every language, framework, and build tool. With Earthly, you can create Docker images and build artifacts (e.g. binaries, packages, and arbitrary files).

So some sort of combination of docker and make. I guess that's useful if I want to send my code into a k8s cluster, for example. But I find myself in the same problem as before... which code, exactly?

I think it's time to dive into one of the many frameworks for building apps that seem to be so popular these days. Blitz, Next, Redwood, Phoenix, Django, etc etc. There seems to be an overwhelming number of options!

But back to Earthly: I was really pleased with their tutorial. They broke it up into nice manageable pieces and even provided some sample code to run at each stage. No time spent debugging issues; everything worked as described.

I think the only way the experience could be enhanced is if they included more of a real world use case. They have some sort of "hello world" go application, but mocking out a flow to help me understand the improvement Earthly offers would be great. I would want to have a somewhat meatier application with an existing build process. Then we come in with a fancy `Earthfile` which saves the day! That would be a nice introduction that makes the case clear. Maybe this is something to consider for a future blog post...
