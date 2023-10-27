# Retrospective

## Introduction
After five weeks of development and a week of daily use, I've discovered multiple issues with the current design of the application that conflict with the intended use case.

The intended use case was to provide a generalized text-based note-taking applicaton that would serve the following two use cases:

1. Todo list
2. General text information store of things to read/learn/cook/eat/play/watch/etc

## The Good
- The default NextJS app has a lot of nice defaults that make it quick to get started.
- Prisma was easy enough to work with. Had a small learning curve.
- TypeScript gave some piece of mind and did catch some bugs before testing.
- Tailwind was convenient and easy to use.
- In general, the data model worked well (helped that it was simple to begin with).

## Issues/Observations
- NextJS isn't the best fit for this project.
  - Troublesome to deploy outside of Vercel, especially SSL.
  - Very little of the site uses the static generation capabilities.
  - Preview deployments in Vercel are very convenient and powerful.
  - Look into other frameworks that deploy more easily. Now that I'm more familiar with NodeJS, I'll be more comfortable with other options.
- Supabase as authentication worked but wasn't very flexible.
  - Since it is hosted, I have no control over deployment or cost.
  - Supabase was very nice to get up and running.
  - Look into libraries where I can back the datastore with a SQL database myself or a service provided by a cloud provider.
- Overly generalized data structure.
  - Traits were not very useful. I rarely found it useful. I can imagine that a much larger number of notes would make it more useful.
  - Traits that were purely informative (URL) did not need to be used as filters.
  - Traits that had values that could be used as comparisons never seemed like they needed to be compared.
  - Try to initially not implement traits at all. Revisit later with the intent of seeing if a pre-set list of traits is sufficient before looking into implementing custom traits.
- Never looked into automated testing
  - Didn't both for a POC.
  - Start using one from the beginning.
- Didn't set up a method for a user to export/import data.
  - This made it uncomfortable for me to enter too much information into the system when using it.
  - Ideally would be a JSON export/import and also backup the entire database at regular intervals.
- In general, start deploying in production immediately and continuously.
- Double ENV files isn't great but never bothered me enough to fix it either. Should prevent it from happening at all in the future. Maybe a simple Secrets manager in a cloud provider.
- Never did figure out what was wrong with the favicon files I created. They were never able to load properly and never displayed.