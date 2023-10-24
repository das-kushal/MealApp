import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'featured',
    title: 'Featured Menu Categories',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Featured Category name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "short_description",
            type: "string",
            title: "Short description",
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: "restaurants",
            type: "array",
            title: "Restaurants",
            of: [{
                type: "reference",
                to: [{ type: "restaurant" }]
            }]
        }),
    ],
})

