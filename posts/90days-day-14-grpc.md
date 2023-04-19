---
title: "90days: Day 14 -- gRPC"
#description: 
date: 2023-04-18 22:49
---

Welcome back to "90 Day of Tutorials". Tonight I wanted something fast, and I knew Apollo was going to take some time, so I tried out [gRPC](https://grpc.io/). They say:
> A high performance, open source universal RPC framework

I guess that's cool enough. What do they have in store for me? There's a [Quickstart](https://grpc.io/docs/languages/node/quickstart/) and a [Basics tutorial](https://grpc.io/docs/languages/node/basics/). We're off to a great start!

Sadly, this is the best part. Everything is in vanilla javascript. It's 2023; typescript or don't bother. The quickstart is fine enough, I suppose. They have me look at a pre-existing client and server, and then I modify the proto definition to support a new method. I then uptake that definition in the client and server and see the change. All standard enough for a getting started.

Things go horribly wrong in the tutorial. Once again they just walk me through pre-existing code. That's not much of a hands on, is it? Worse, the code that they reference doesn't match up with the code on the tutorial. Red flag! Finally, my personal pet peeve: they've picked some new functional domain. This time we're building some sort of maps knock-off, where it streams route location or something. I suppose my suggestion of a blogging engine or a todo list doesn't necessarily lend itself to RPC flavors, but it'd still be possible. But I found all the geolocation code to be getting in the way of the lesson, because I'm not familiar with it.

Overall this was a pretty disappointing introduction to a pretty cool technology. They could definitely use a refreshed lesson. It's even in a lesson in how to _not_ do a tutorial.
