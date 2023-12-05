import { defineType, defineField } from "sanity";
import { BsPenFill, BsLink45Deg, BsGlobe2 } from "react-icons/bs";

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
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                icon: BsLink45Deg,
                name: "internalLink",
                type: "object",
                title: "Internal link",
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    title: "Reference",
                    to: [
                      { type: "post" },
                      // other types you may want to link to
                    ],
                  },
                ],
              },
              {
                icon: BsGlobe2,
                name: "link",
                type: "object",
                title: "External link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    description:
                      "Read https://css-tricks.com/use-target_blank/",
                    type: "boolean",
                  },
                ],
              },
            ],
          },
        },
        { type: "blogImage" },
        // { type: "embeddedVideo" },
      ],
    }),
  ],
});
