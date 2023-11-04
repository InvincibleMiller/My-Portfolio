import { defineType, defineField } from "sanity";
import { BsTvFill, BsFillFileEarmarkFill } from "react-icons/bs";

export default defineType({
  icon: BsTvFill,
  name: "featured",
  title: "Featured",
  type: "object",
  fields: [
    defineField({
      icon: BsFillFileEarmarkFill,
      name: "post",
      title: "Featured Document",
      type: "reference",
      to: [{ type: "post" }],
      validation: (r) => r.required(),
    }),
  ],
});
