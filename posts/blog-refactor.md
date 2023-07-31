---
title: Refactoring the Blog
date: 2023-07-31 23:06
---

So I've recently refactored the entire blog to use some plugins that I've
developed for Fresh. In a recent [PR](https://github.com/deer/blog/pull/1/files)
you can see how I deleted most of the code from this project, and I instead
reference two plugins:

- [Fresh Blog](https://github.com/deer/fresh_blog)
- [Fresh GA4](https://github.com/deer/fresh_ga4)

These plugins should allow people to skip over some of the drudgery and just get
straight on with what they were trying to do, namely building a blog or adding
google analytics to their site.

Look for a bunch of enhancements to the blog plugin in the next month!
