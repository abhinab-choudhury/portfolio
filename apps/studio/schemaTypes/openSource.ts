import {defineField, defineType} from 'sanity'

export const openSource = defineType({
  name: 'openSource',
  title: 'Open Source Contribution',
  type: 'document',
  fields: [
    defineField({
      name: 'org_name',
      title: 'Organization Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'project_name',
      title: 'Project Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'org_url',
      title: 'Organization URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'repo_url',
      title: 'Repository URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'pr_title',
      title: 'PR Title / Issue Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'pr_url',
      title: 'PR/Issue URL',
      type: 'url',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Merged', value: 'merged'},
          {title: 'Open', value: 'open'},
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Closed', value: 'closed'},
        ],
        layout: 'radio',
      },
      initialValue: 'merged',
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
      title: 'pr_title',
      org: 'org_name',
      project: 'project_name',
      status: 'status',
    },
    prepare({title, org, project, status}) {
      return {
        title: title,
        subtitle: `${org} / ${project} • ${status}`,
      }
    },
  },
})
