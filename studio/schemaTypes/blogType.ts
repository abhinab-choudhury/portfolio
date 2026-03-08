import { defineField, defineType } from "sanity";

export const blogType = defineType({
    name: "blog",
    title: "Blog",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        
        defineField({
            name: "order",
            title: "Order",
            type: "number",
        }),

        defineField({
            name: "gist",
            title: "Gist",
            type: "text",
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "url",
            title: "URL",
            type: "url",
            validation: (rule) => rule.required(),
        }),
        
        defineField({
            name: "published_date",
            title: "Published Date",
            type: "date",
            validation: (rule) => rule.required(),
        }),
    ],
});