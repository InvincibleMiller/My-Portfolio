import { defineType, defineField } from "sanity";
import { BsPenFill } from "react-icons/bs";

export default defineType({
  icon: BsPenFill,
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "hook",
      title: "Post Hook",
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
      name: "slug",
      title: "Post Slug",
      type: "slug",
      options: {
        source: (doc) => doc.title,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "preview",
      title: "Preview Image",
      type: "blogImage",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }, { type: "blogImage" }, { type: "embeddedVideo" }],
    }),
  ],
});
