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
    platforms: z.record(
      z.string(),
      z.object({
        label: z.string(),
        badge: z.string().optional(),
        summary: z.string().optional(),
        code: z.string().optional(),
        steps: z.array(z.string()),
      })
    ).optional(),
  }),
});

export const collections = { guides };
