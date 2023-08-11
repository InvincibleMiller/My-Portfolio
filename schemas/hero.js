import { defineField } from "sanity";
import { HiOutlineDocument } from "react-icons/hi2";

const hero = {
  name: "hero",
  title: "Hero",
  type: "document",
  icon: HiOutlineDocument,
  fields: [
    defineField({
      name: "headline",
      type: "string",
      title: "Headline",
    }),
    defineField({
      name: "mainHook",
      type: "string",
      title: "Main Hook",
    }),
    defineField({
      name: "cta",
      type: "string",
      title: "Call To Action",
    }),
    defineField({
      name: "background",
      type: "image",
      title: "Background",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    }),
  ],
};

export default hero;
