import { defineCollection, z } from '@nuxt/content'

const createEnum = (options: [string, ...string[]]) => z.enum(options)

const createLinkSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional().editor({ input: 'icon' }),
  trailingIcon: z.string().optional().editor({ input: 'icon' }),
  size: createEnum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  trailing: z.boolean().optional(),
  target: createEnum(['_blank', '_self']).optional(),
  color: createEnum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info']).optional(),
  variant: createEnum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  class: z.string().optional()
})

const createNavigationItemSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().optional(),
  icon: z.string().optional().editor({ input: 'icon' }),
  children: z.array(z.object({
    label: z.string().nonempty(),
    to: z.string().nonempty(),
    icon: z.string().optional().editor({ input: 'icon' }),
    description: z.string().optional()
  })).optional()
})

const navigationSchema = z.object({
  header: z.array(createNavigationItemSchema()),
  cta: z.array(createLinkSchema()),
  footer: z.array(createLinkSchema())
})

const featuresSchema = z.object({
  items: z.array(z.object({
    label: z.string().nonempty(),
    discord: z.boolean(),
    telegram: z.boolean(),
    primeLeague: z.boolean()
  }))
})

// One set of collections per locale, German (default) pages keep their unprefixed paths, English ones live under /en
export const collections = {
  pages_de: defineCollection({
    type: 'page',
    source: { include: 'de/**/*.md', prefix: '' }
  }),

  pages_en: defineCollection({
    type: 'page',
    source: { include: 'en/**/*.md', prefix: '/en' }
  }),

  navigation_de: defineCollection({
    type: 'data',
    source: 'de/navigation.yml',
    schema: navigationSchema
  }),

  navigation_en: defineCollection({
    type: 'data',
    source: 'en/navigation.yml',
    schema: navigationSchema
  }),

  features_de: defineCollection({
    type: 'data',
    source: 'de/features.yml',
    schema: featuresSchema
  }),

  features_en: defineCollection({
    type: 'data',
    source: 'en/features.yml',
    schema: featuresSchema
  })
}
