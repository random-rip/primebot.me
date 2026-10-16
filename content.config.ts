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

export const collections = {
  pages: defineCollection({
    type: 'page',
    source: '**/*.md'
  }),

  navigation: defineCollection({
    type: 'data',
    source: 'navigation.yml',
    schema: z.object({
      header: z.array(createNavigationItemSchema()),
      cta: z.array(createLinkSchema()),
      footer: z.array(createLinkSchema())
    })
  }),

  features: defineCollection({
    type: 'data',
    source: 'features.yml',
    schema: z.object({
      items: z.array(z.object({
        label: z.string().nonempty(),
        discord: z.boolean(),
        telegram: z.boolean(),
        primeLeague: z.boolean()
      }))
    })
  })
}
