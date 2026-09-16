import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    section: z.enum(['network', 'routing', 'stream', 'hardmod']),
    order: z.number(),
    description: z.string().optional(),
    interactive: z.string().optional(),
  }),
});

export const collections = { guides };
