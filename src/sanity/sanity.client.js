import SanityClient from "next-sanity-client";
import { cache } from "react";

const config = {
  projectId: "vy0gmtde",
  dataset: "production",
  apiVersion: "2023-08-02",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
};

const client = new SanityClient(config);

export default client;
