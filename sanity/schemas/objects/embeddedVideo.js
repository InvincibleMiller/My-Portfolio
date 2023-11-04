import { defineType, defineField } from "sanity";
import { BsFilm } from "react-icons/bs";

export default defineType({
  icon: BsFilm,
  name: "embeddedVideo",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Video URL",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Thumbnail",
      type: "image",
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
