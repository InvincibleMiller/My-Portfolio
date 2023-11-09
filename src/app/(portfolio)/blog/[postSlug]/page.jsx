import { client as sanityClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";

import { tsToSimple } from "@/src/util/timestamps";

import {
  EmbeddedImage,
  EmbeddedVideo,
} from "@/src/components/Blog/BlogComponents";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const Page = async ({ params }) => {
  const { postSlug } = params;

  const postDocument = await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == "${postSlug}"][0]`
  );

  if (!postDocument) return 404;

  const {
    preview: postPreview,
    title,
    content,
    _createdAt: publishedTS,
    _updatedAt: updatedTS,
  } = postDocument;

  const blogComponents = {
    types: {
      blogImage: EmbeddedImage,
      embeddedVideo: EmbeddedVideo,
    },
    marks: {
      internalLink: ({ value, children }) => {
        const { slug = {} } = value;
        const href = `/${slug.current}`;
        return <a href={href}>{children}</a>;
      },
      link: ({ value, children }) => {
        // Read https://css-tricks.com/use-target_blank/
        const { blank, href } = value;
        return blank ? (
          <a href={href} target="_blank" rel="noopener">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        );
      },
    },
  };

  return (
    <section id="blog-post">
      <div className="container-center container-blog">
        <h1>{title}</h1>
        <p className="time-title">
          <span>Published: {tsToSimple(publishedTS)}</span>&nbsp;|&nbsp;
          <span>Updated: {tsToSimple(updatedTS)}</span>
        </p>
        <div className="post-card">
          <img
            alt={postPreview?.alt}
            src={urlForImage(postPreview?.image).quality(60).url()}
          />
          {postPreview?.caption && (
            <div className="card-body text-center caption">
              <PortableText value={postPreview.caption} />
            </div>
          )}
        </div>
        <PortableText value={content} components={blogComponents} />
      </div>
    </section>
  );
};

export default Page;
