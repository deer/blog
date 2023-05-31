---
title: Adding Comments to the Blog
description: 
date: 2023-05-31 14:07
---

You're using Deno Fresh and want Disqus comments for your blog? Great, I found myself in this exact situation. Fortunately this [guy](https://github.com/haikelfazzani/portfolio) already has us taken care of.

He's provided:
* an [island](https://github.com/haikelfazzani/portfolio/blob/d5deb75686023c295c13fc306a4f95d1b94870c2/islands/Disqus.tsx)
* a [component](https://github.com/haikelfazzani/portfolio/blob/d5deb75686023c295c13fc306a4f95d1b94870c2/components/DiscussionEmbed.tsx)
* a [snippet](https://github.com/haikelfazzani/portfolio/blob/d5deb75686023c295c13fc306a4f95d1b94870c2/routes/blog/%5Bslug%5D.tsx#L51) to embed the disqus component on the page

Since I'm trying to get something done before the end of the month in order to hit my minimal goal, I'll not look into this too much for now. The only thing I did differently is remove his usage of `state`; I want the comments on my post to always be open.

Of course, I would prefer for them to be pre-rendered on the server instead of hydrating on the client. They seem to load super slowly. Although I guess that's a project for later.
