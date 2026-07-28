import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  fields: [
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
      description: 'Icon identifier (e.g. "refresh-ccw", "brain-circuit")',
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
