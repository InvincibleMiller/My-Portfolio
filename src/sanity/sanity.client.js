// sanity/sanity.client.ts

import { createClient } from "@sanity/client";

const config = {
  projectId: "vy0gmtde",
  dataset: "production",
  apiVersion: "2023-08-02",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
};

const client = createClient(config);

export default client;
