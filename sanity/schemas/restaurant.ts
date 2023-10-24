import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Restaurant name",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image of the restaurant",
    }),
    defineField({
      name: "lat",
      type: "number",
      title: "Latitude of the restaurant",
    }),
    defineField({
      name: "long",
      type: "number",
      title: "Longitude of the restaurant",
    }),
    defineField({
      name: "address",
      type: "string",
      title: "Address of the restaurant",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "rating",
      type: "number",
      title: "Enter the rating of the restaurant (1-5 stars)",
      validation: Rule => Rule.required().min(1).max(5).error('Rating must be between 1 and 5'),
    }),
    defineField({
      name: "type",
      title: "Category",
      validation: Rule => Rule.required(),
      type: "reference",
      to: [{ type: "category" }]


    }),
    defineField({
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{
        type: "reference",
        to: [{ type: "dish" }]
      }]
    }),
  ],
})
