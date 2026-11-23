import {defineField, defineType} from 'sanity'

export const openSource = defineType({
  name: 'openSource',
  title: 'Open Source Contribution',
  type: 'document',
  fields: [
    defineField({
      name: 'githubAvailable',
      title: 'Publicly available on GitHub',
      type: 'boolean',
      readOnly: true,
    }),
    defineField({name: 'githubId', title: 'GitHub ID', type: 'string', readOnly: true}),
    defineField({
      name: 'githubTitle',
      title: 'Latest GitHub title',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'githubEligible',
      title: 'Matches automatic display rules',
      type: 'boolean',
      readOnly: true,
    }),
    defineField({name: 'mergedAt', title: 'Merged at', type: 'datetime', readOnly: true}),
    defineField({
      name: 'visibility',
      title: 'Visibility override',
      type: 'string',
      description:
        'Automatic shows merged PRs to public repositories you do not own. Show still needs to be enabled below.',
      options: {
        list: [
          {title: 'Automatic', value: 'auto'},
          {title: 'Always show', value: 'show'},
          {title: 'Always hide', value: 'hide'},
        ],
      },
      initialValue: 'auto',
    }),
    defineField({name: 'pinned', title: 'Pin to top', type: 'boolean', initialValue: false}),
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
