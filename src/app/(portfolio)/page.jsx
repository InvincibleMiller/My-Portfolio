import { client as sanityClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { urlForImage } from "@/sanity/lib/image";

import Thumbnail from "@/src/components/Thumbnail";

import { PortableText } from "@portabletext/react";

import { tsToSimple } from "@/src/util/timestamps";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function page() {
  const params = {};

  const newestHomePage = await sanityClient.fetch(
    groq`*[_type == "homePage"] {thoughts, "featured": featured.post->} | order(_createAt desc) [0]`,
    params
  );

  const recentPosts = await sanityClient.fetch(
    groq`*[_type == "post"] { title, preview, hook, slug, _createdAt } | order(_createAt desc) [0...5]`,
    params
  );

  const newestProfile = await sanityClient.fetch(
    groq`*[_type == "profile"] | order(_createdAt desc) [0]`
  );

  const { featured: featuredPost, thoughts } = newestHomePage;

  return (
    <>
      <section id="featured">
        <div className="container-center container-sm">
          <h1 className="section-title">Featured</h1>
          <a href={`/blog/${featuredPost?.slug.current}`} className="post-card">
            <Thumbnail
              src={urlForImage(featuredPost?.preview.image).quality(60).url()}
            />
            <div className="card-body">
              <p className="time-title">
                {tsToSimple(featuredPost?._createdAt)}
              </p>
              <h2 className="card-title">{featuredPost?.title}</h2>
              <p>{featuredPost?.hook}</p>
            </div>
          </a>
        </div>
      </section>
      <section id="thoughts">
        <div className="container-center">
          <div className="text-center display">
            <PortableText value={thoughts} />
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="container-center">
          <div className="flex-grid">
            <div className="column" id="post-column">
              <h1 className="section-title">Posts</h1>
              <div>
                {recentPosts?.map(
                  ({ title, preview, hook, slug, _createdAt }) => {
                    return (
                      <a href={`/blog/${slug.current}`} className="post-card">
                        <Thumbnail
                          src={urlForImage(preview.image).quality(60).url()}
                        />
                        <div className="card-body">
                          <p className="time-title">{tsToSimple(_createdAt)}</p>
                          <h2 className="card-title">{title}</h2>
                          <p>{hook}</p>
                        </div>
                      </a>
                    );
                  }
                )}
              </div>
            </div>
            <div className="column" id="about-me">
              <h1 className="section-title">About Me</h1>
              <div className="content">
                <img
                  className="profile-image"
                  src={urlForImage(newestProfile?.image.image)
                    .width(640)
                    .height(640)
                    .url()}
                />
                <div>
                  <PortableText value={newestProfile?.bio} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
