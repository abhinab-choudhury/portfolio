import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  orderings: [
    {title: 'Project order', name: 'projectOrder', by: [{field: 'order', direction: 'asc'}, {field: '_createdAt', direction: 'desc'}]},
  ],
  fields: [
    defineField({
      name: 'slug', title: 'Project URL', type: 'slug',
      options: {source: 'project_title', maxLength: 96},
      description: 'Generate from the title for /project/your-project-name. Keep this stable after sharing the link.',
      validation: rule => rule.custom(value => !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) || 'Use lowercase letters, numbers, and single hyphens.'),
    }),
    defineField({
      name: 'details', title: 'Project details (Markdown)', type: 'text', rows: 20,
      description: 'Write Markdown: ## headings, paragraphs, **bold**, lists, links, tables, and fenced code blocks. Explain the problem, your approach, and results.',
    }),
    defineField({
      name: 'order',
      title: 'Project order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3…). Leave empty to show after ordered projects. Ties show newest first.',
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: 'project_title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'header_icon',
      title: 'Header Icon',
      type: 'string',
      description: 'Lucide icon name in kebab-case (e.g. "brain-circuit", "qr-code")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image_src',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'github_url',
      title: 'GitHub URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'deployment_url',
      title: 'Deployment URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'blog_url',
      title: 'Blog URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'show',
      title: 'Show',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'project_title',
      subtitle: 'description',
      media: 'header_icon',
    },
  },
})
