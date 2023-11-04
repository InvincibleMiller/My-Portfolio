import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { urlForImage, urlForImageBase } from "@/sanity/lib/image";

import Thumbnail from "@/src/components/Thumbnail";

export default async function page() {
  const newestHomePage = await client.fetch(
    groq`*[_type == "homePage"] {..., "featured": featured.post->} | order(_createAt desc) [0]`
  );

  const {
    title: pageTitle,
    hook: pageHook,
    featured: featuredPost,
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
          <nav className="navbar container-center">
            <ul>
              <li>Home</li>
              <li>About Me</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section className="container-center container-sm" id="featured">
          <h1 className="section-title">Featured</h1>
          <div className="post-card">
            <Thumbnail
              src={urlForImage(featuredPost?.preview.image).quality(60).url()}
            />
            <div className="card-body">
              <h2 className="card-title">{featuredPost.title}</h2>
              <p>{featuredPost.hook}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
