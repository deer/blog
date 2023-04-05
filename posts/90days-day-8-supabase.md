---
title: "90days: Day 8 -- Supabase"
#description: 
date: 2023-04-05 8:40
---

So what do we do today? Obviously test out a backend as a service: [Supabase](https://supabase.com/). They say:
> Supabase is an open source Firebase alternative. Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, and Storage.

Sounds powerful. Let's check it out with their [framework quickstart for Next](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs). It's a really simple start. Create a project, create a table, load some sample data. Then create a Next app and modify the index to pull the data from the table. Perfect start.

The next one involves building a [user management app](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs). This sounds a bit more complicated. If you've been following along with this series, then you'll know that I would prefer if they built a blogging platform. Oh well.

The tutorial works smooth enough, and the finished project is pretty sweet: I can sign up with an email address, receive a confirmation link, log in, upload an avatar and add some personal details. Finally, due to some database triggers, the avatar is deleted from the backing S3 bucket when I delete my account. I'm really impressed with Supabase, and I would definitely just use this for a real project, if I ever get around to creating one. I really like how they take care of authentication and sign up for me. They've even provided an authentication component for me.