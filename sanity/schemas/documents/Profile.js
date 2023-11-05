import { BsFilePersonFill } from "react-icons/bs";
import { defineType, defineField } from "sanity";

export default defineType({
  icon: BsFilePersonFill,
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Profile Picture",
      type: "blogImage",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
