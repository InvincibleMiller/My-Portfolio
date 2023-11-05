import { defineType, defineField } from "sanity";
import { BsGlobeAmericas } from "react-icons/bs";

export default defineType({
  icon: BsGlobeAmericas,
  name: "social",
  title: "Social Media",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Logo",
      type: "image",
      validation: (r) => r.required(),
    }),
  ],
});
