// sanity/sanity.query.ts

import client from "./sanity.client";

const queryConfig = {
  // cache: "no-store",
  cache: "force-cache",
  next: { revalidate: 60 },
};

export async function getProfile() {
  return client.fetch({
    query: `*[ _type == "profile" && !(_id in path("drafts.**"))][0]{
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
    }`,
    queryConfig,
  });
}

export async function getHero() {
  return client.fetch({
    query: `*[_type == "hero" && !(_id in path("drafts.**"))][0]{
      _id,
      headline,
      mainHook,
      cta,
      background {alt, "image": asset->url},
      heroImage {alt, "image": asset->url},
    }`,
    queryConfig,
  });
}

export async function getProjects() {
  return client.fetch({
    query: `*[_type == "project" && !(_id in path("drafts.**"))] | order(ranking desc) {
      _id,
      shortDescription,
      stack,
      title,
      thumbnail {alt, "image": asset->url},
      url,
    }`,
    queryConfig,
  });
}
