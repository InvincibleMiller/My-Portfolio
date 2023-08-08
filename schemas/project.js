import { defineField } from "sanity";
import { HiOutlineWindow } from "react-icons/hi2";

const project = {
  name: "project",
  title: "Project",
  type: "document",
  icon: HiOutlineWindow,
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "url",
      name: "url",
      title: "URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "text",
      name: "shortDescription",
      title: "Short Description",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "image",
      name: "thumbnail",
      title: "Thumbnail",
      fields: [
        {
          type: "string",
          name: "alt",
          title: "Alt",
        },
      ],
    }),
    defineField({
      type: "array",
      name: "longDescription",
      title: "Long Description",
      of: [{ type: "block" }],
    }),
    defineField({
      type: "array",
      name: "stack",
      title: "Tech Stack",
      of: [{ type: "string" }],
    }),
    defineField({
      type: "number",
      name: "ranking",
      title: "Ranking",
      initialValue: 0,
    }),
  ],
};

export default project;
