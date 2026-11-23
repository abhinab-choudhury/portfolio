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
