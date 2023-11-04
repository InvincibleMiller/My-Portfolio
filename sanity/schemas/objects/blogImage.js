import { defineType, defineField } from "sanity";
import { BsImageFill } from "react-icons/bs";

export default defineType({
  icon: BsImageFill,
  name: "blogImage",
  title: "Blog Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternate Text",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "array",
      of: [
        {
          type: "block",
          // Only normal text
          styles: [{ title: "Normal", value: "normal" }],
          // No Lists
          lists: [],
          marks: {
            // Only allow these decorators
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            // No annotations
            annotations: [],
          },
        },
      ],
      validation: (r) => r.required(),
    }),
  ],
});
