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
  variant: createEnum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional()
})

export const collections = {
  landing: defineCollection({
    type: 'page',
    source: 'index.yml',
    schema: z.object({
      hero: z.object({
        headline: z.string().optional(),
        links: z.array(createLinkSchema())
      }),
      features: z.object({
        headline: z.string().optional(),
        title: z.string().nonempty(),
        description: z.string().optional(),
        items: z.array(z.object({
          icon: z.string().editor({ input: 'icon' }),
          title: z.string().nonempty(),
          description: z.string().nonempty()
        }))
      }),
      cta: z.object({
        title: z.string().nonempty(),
        description: z.string().optional(),
        links: z.array(createLinkSchema())
      })
    })
  }),

  pages: defineCollection({
    type: 'page',
    source: {
      include: '**/*.md'
    }
  }),

  navigation: defineCollection({
    type: 'data',
    source: 'navigation.yml',
    schema: z.object({
      header: z.array(createLinkSchema()),
      cta: z.array(createLinkSchema()),
      footer: z.array(createLinkSchema())
    })
  })
}
