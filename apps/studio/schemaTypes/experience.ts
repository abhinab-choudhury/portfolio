import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'companyLogo', title: 'Company logo', type: 'image', description: 'Upload the company logo. It is shown beside your role; company initials are used when empty.'}),
    defineField({name: 'role', title: 'Role', type: 'string', validation: rule => rule.required()}),
    defineField({name: 'company', title: 'Company', type: 'string', validation: rule => rule.required()}),
    defineField({name: 'companyUrl', title: 'Company website', type: 'url', validation: rule => rule.uri({scheme: ['http', 'https']})}),
    defineField({name: 'location', title: 'Location', type: 'string', description: 'Optional, e.g. Bengaluru · Remote'}),
    defineField({name: 'startDate', title: 'Start date', type: 'date', validation: rule => rule.required()}),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      description: 'Leave empty for your current role.',
      validation: rule => rule.custom((endDate, context) => {
        const startDate = context.document?.startDate
        return !endDate || typeof startDate !== 'string' || endDate >= startDate || 'End date must be on or after the start date.'
      }),
    }),
    defineField({
      name: 'description',
      title: 'Description (Markdown)',
      type: 'text',
      rows: 10,
      description: 'Describe your work using Markdown: **bold**, *italic*, - bullet points, numbered lists, [links](https://example.com), and fenced code blocks. Separate paragraphs with a blank line. Plain text is also supported.',
    }),
    defineField({name: 'show', title: 'Show on portfolio', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Most recent first', name: 'startDateDesc', by: [{field: 'startDate', direction: 'desc'}]}],
  preview: {select: {title: 'role', subtitle: 'company'}},
})
