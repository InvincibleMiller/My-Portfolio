import { client as sanityClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import PostList from "@/src/components/PostList";

export const dynamic = "force-dynamic";
export const revalidate = 60;

async function BlogPage() {
  const filterLength = 10;

  const blogPosts = await sanityClient.fetch(
    groq`*[_type == "post"] | order(_createdAt desc) [0...${filterLength}] { title, preview, hook, slug, _createdAt }`
  );

  return (
    <>
      <section id="blogPosts">
        <div className="container-center container-sm">
          <h1 className="section-title">Project Blog</h1>
          <div className="blog-post-container">
            <PostList posts={blogPosts} />
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPage;
