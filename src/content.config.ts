import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog / Insights collection.
// To add a post: drop a new .md file in src/content/blog/ with the frontmatter
// below. The filename (kebab-case) becomes the URL: my-post.md -> /blog/my-post.
// Set `draft: true` to keep a post out of the built site until it's ready.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
