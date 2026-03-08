import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [

    defineField({
      name: "is_private",
      title: "Private Project",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "project_title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "short_description",
      title: "Short Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "project_icon_image",
      title: "Project Icon",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "portfolio_icon_image",
      title: "Portfolio Icon",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "github_url",
      title: "GitHub URL",
      type: "url",
    }),

    defineField({
      name: "deployment_url",
      title: "Deployment URL",
      type: "url",
    }),

    defineField({
      name: "blog_url",
      title: "Blog URL",
      type: "url",
    }),

    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),

    defineField({
      name: "tags",
      title: "Project tags",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "project_details",
      title: "Project Details",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});