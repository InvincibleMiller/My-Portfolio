import { defineField, defineType } from "sanity";
import { BsFillFileEarmarkFill } from "react-icons/bs";

export default defineType({
  icon: BsFillFileEarmarkFill,
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "hook",
      title: "Hook",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "socials",
      title: "Socials",
      type: "array",
      of: [{ type: "social" }],
    }),
    defineField({
      name: "featured",
      title: "Features Post",
      type: "featured",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "thoughts",
      title: "Thoughts",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
