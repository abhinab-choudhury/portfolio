import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const recentBlog = defineType({
  name: 'recentBlog',
  title: 'Recent Blog',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gist',
      title: 'Gist',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}).required(),
    }),
    defineField({
      name: 'create_at',
      title: 'Created At',
      type: 'datetime',
      validation: (rule) => rule.required(),
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
      title: 'title',
      subtitle: 'gist',
    },
  },
})
