import { client as sanityClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { urlForImage } from "@/sanity/lib/image";

import Thumbnail from "@/src/components/Thumbnail";

import { PortableText } from "@portabletext/react";

import Link from "next/link";

export default async function page() {
  const params = {
    next: {
      revalidate: 30, // look for updates to revalidate cache every 30s
    },
  };

  const newestHomePage = await sanityClient.fetch(
    groq`*[_type == "homePage"] {..., "featured": featured.post->} | order(_createAt desc) [0]`,
    params
  );

  const recentPosts = await sanityClient.fetch(
    groq`*[_type == "post"] { title, preview, hook } | order(_createAt desc) [0...5]`,
    params
  );

  const newestProfile = await sanityClient.fetch(
    groq`*[_type == "profile"] | order(_createdAt desc) [0]`
  );

  const {
    title: pageTitle,
    hook: pageHook,
    featured: featuredPost,
    thoughts,
    socials,
  } = newestHomePage;

  return (
    <>
      <header>
        <div className="header-title">
          <div className="container-center">
            <h3 className="display-sub">{pageHook}</h3>
            <h1 className="display-title">{pageTitle}</h1>
          </div>
        </div>
        <div className="navbar-container">
          <div className="container-center">
            <nav className="navbar">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <Link scroll href={"/#projects"}>
                    Projects
                  </Link>
                </li>
                <li>Blog</li>
                <li>Contact</li>
                <li className="socials">
                  {socials?.map(({ name, url, icon }) => {
                    return (
                      <a
                        className="social"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={url}
                      >
                        <div
                          className="social-icon"
                          style={{
                            backgroundImage: `url("${urlForImage(icon)
                              .width(16)
                              .url()}")`,
                          }}
                          alt={name}
                        ></div>
                        <span style={{ display: "none" }}>{name}</span>
                      </a>
                    );
                  })}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <section id="featured">
          <div className="container-center container-sm">
            <h1 className="section-title">Featured</h1>
            <div className="post-card">
              <Thumbnail
                src={urlForImage(featuredPost?.preview.image).quality(60).url()}
              />
              <div className="card-body">
                <h2 className="card-title">{featuredPost?.title}</h2>
                <p>{featuredPost?.hook}</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container-center">
            <div className="text-center display">
              {thoughts?.map((block) => (
                <p>
                  {block.children.map(({ _type: Type, text, marks }) => {
                    const tags = marks.reduce(
                      (sum, Tag) => <Tag>{sum}</Tag>,
                      text
                    );
                    return <Type>{tags}</Type>;
                  })}
                </p>
              ))}
            </div>
          </div>
        </section>
        <section id="projects">
          <div className="container-center">
            <div className="flex-grid">
              <div className="column" id="post-column">
                <h1 className="section-title">Posts</h1>
                <div>
                  {recentPosts?.map(({ title, preview, hook }) => {
                    return (
                      <div className="post-card">
                        <Thumbnail
                          src={urlForImage(preview.image).quality(60).url()}
                        />
                        <div className="card-body">
                          <h2 className="card-title">{title}</h2>
                          <p>{hook}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="column shrink-column">
                <h1 className="section-title">About Me</h1>
                <img
                  className="profile-image"
                  src={urlForImage(newestProfile?.image.image)
                    .width(640)
                    .height(640)
                    .url()}
                />
                <PortableText value={newestProfile?.bio} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
