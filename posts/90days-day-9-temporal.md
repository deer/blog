---
title: "90days: Day 9 -- Temporal"
#description: 
date: 2023-04-14 04:38
---

I'm back from vacation and being sick. Time to learn about [Temporal](https://temporal.io/), which helps to make it easier to deal with writing microservices. They say:
> Eliminate complex error or retry logic, avoid callbacks, and ensure that every workflow you start, completes. Temporal delivers durable execution for your services and applications.

When dealing with distributed systems, there's a lot of boilerplate around retries and exponential backoff and orchestration and rollbacks. Everyone has to do the same thing to make things safe. What if there was a framework to help with that? Enter Temporal.

They have a pretty good [getting started](https://learn.temporal.io/getting_started/typescript/hello_world_in_typescript/) which involves the creation of a simple "hello world". The twist here is that you have to use their `Temporal Cluster` docker image for the orchestration, which does all the fancy stuff. We're just interested in the client code. That's pretty nice. I want more.

Fortunately they're prepared. They have a [course](https://learn.temporal.io/courses/temporal_101/typescript) which goes a bit deeper. This time some of the client code we look at involves calling out to an external service. This is pretty cool, except I of course want them to go further.

They hold our hand about launching this example, but I want a modification (which isn't terribly hard to make): add a manual delay to the "activity" (temporal speak for some client code that could possibly fail) to give me time to kill the microservice before it executes. This would mimic some real-world situation where the service is down.

Additionally, I don't like how the project doesn't seem to support pnpm. And the sdk used as part of the course is wildly out of date. The course uses 1.0.0, which was released in July of 2022. I expect the training materials to be updated more than every nine months!

Finally, this is still some sort of 'hello world' variant. It would be cool to have the user implement some sort of real-world use case. Something like a todo list which communicates across multiple services. Or the backend of a blogging platform, where comments require approvals from an admin.

Overall the product seems excessively cool, and I will definitely try incorporating this into an actual project. The onboarding could be improved, given my concerns mentioned above.
