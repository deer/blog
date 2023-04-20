---
title: "90days: Day 15 -- Bit"
#description: 
date: 2023-04-19 21:22
---

Welcome back to "90 Day of Tutorials". Today we're looking at [Bit](https://bit.dev/), which they describe as:
>An open-source toolchain for component-driven software. Forget monolithic apps and distribute development to components.

Ok, let's see what we have in store then. The website is clever, since it highlights all the components used to build the website. Great reflexivity.

Sadly this is where the website stops being great. As I'm following their [Quickstar](https://bit.dev/docs/quick-start/hello-world/), I'm quite frustrated. Whatever they want me to download and install is huge, because everything seems so slow. Additionally, when navigating to a link and then going back, my position on the original page is lost. Big fail in terms of user experience. Finally, they redefine a bunch of terms without providing inline definitions of them. (Thus necessitating click on links and then possibly going back.)

The nightmare gets worse. I've run their `bit start` and I'm presented with the following image as the primary section (there's a sidebar as well):
![bit](../bit-wtf.png)

There is no explanation of what these components are or how they relate to each other. Why is it useful or desirable to have "hello-world-app", "hello-world", and "get-hello-world"? They tell me:
> The workspace UI displays all components maintained by your workspace. Use it to explore your components' compositions, documentation, dependency graph, version history, and more.

With many of the nouns being links to other pages, just waiting to steal my location on the tutorial. No thanks!

At this point I would honestly stop due to such a poor experience so far. But a colleague at work is quite excited about Bit, so I will keep going to see what the hype is about.

I've finished this quickstart, but it was pretty bad. I've reached the end and I'm thinking "why would I bother continuing to use this?" The commands were slow, the website doesn't keep my location on the page, and almost nothing was put in context. What advantage did this offer me?

They have a more complex [tutorial](https://bit.dev/docs/react-intro) as well, but that seems like a lot of work. I'll have a chat with my coworker and see if he can convince me to complete this.

Overall: they really need to work on their developer onboarding. [Yesterday's gRPC](/blog/90days-day-14-grpc) gets a pass, since they obviously just don't care that much about being flashy. Bit is trying to be flashy and attract developers, but they don't seem to be doing a good job.
