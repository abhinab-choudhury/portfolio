import { defineField, defineType } from "sanity";


export const socialLinkType = defineType({
    name: "socialLink",
    title: "Social Link",
    type: "document",
    fields: [
        defineField({
            name: "platform",
            title: "Platform",
            type: "string",
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "url",
            title: "URL",
            type: "url",
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "icon",
            title: "Icon",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "order",
            title: "Order",
            type: "number",
        }),
    ],
})