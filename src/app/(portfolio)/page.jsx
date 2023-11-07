import { client as sanityClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { urlForImage } from "@/sanity/lib/image";

import { PortableText } from "@portabletext/react";

import PostList from "@/src/components/PostList";

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
          <PostList posts={[featuredPost]} />
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
                <PostList posts={recentPosts} />
              </div>
            </div>
            <div className="column" id="about-me">
              <h1 className="section-title">About Me</h1>
              <div className="post-card">
                <div className="content card-body">
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
        </div>
      </section>
    </>
  );
}
