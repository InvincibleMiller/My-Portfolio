// schemas/profile.ts

import { HiUser } from "react-icons/hi2";

const profile = {
  name: "profile",
  title: "Profile",
  type: "document",
  icon: HiUser,
  fields: [
    {
      type: "object",
      name: "name",
      title: "Full Name",
      fields: [
        {
          name: "first",
          type: "string",
          title: "First",
        },
        {
          name: "last",
          type: "string",
          title: "Last",
        },
      ],
    },
    {
      type: "email",
      name: "email",
      title: "Email",
    },
    {
      type: "text",
      name: "shortBio",
      title: "Short Bio",
      rows: 3,
    },
    {
      type: "array",
      name: "longBio",
      title: "Long Bio",
      of: [{ type: "block" }],
    },
    {
      type: "array",
      name: "skills",
      title: "Skills",
      of: [{ type: "string" }],
    },
  ],
};

export default profile;
