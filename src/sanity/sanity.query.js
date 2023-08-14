// sanity/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getProfile() {
  return client.fetch(
    groq`*[ _type == "profile" && !(_id in path("drafts.**"))][0]{
      _id,
      name,
      email,
      "bio": {
        "long": longBio[]{
          _key,
          style,
          "text": children[0]["text"],
        }, 
        "short": shortBio
      },
      skills,
      socials []{"image": asset->url, link, alt},
    }`
  );
}

export async function getHero() {
  return client.fetch(
    groq`*[_type == "hero" && !(_id in path("drafts.**"))][0]{
      _id,
      headline,
      mainHook,
      cta,
      background {alt, "image": asset->url},
      heroImage {alt, "image": asset->url},
    }`
  );
}

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project" && !(_id in path("drafts.**"))] | order(ranking desc) {
      _id,
      shortDescription,
      stack,
      title,
      thumbnail {alt, "image": asset->url},
      url,
    }`
  );
}
