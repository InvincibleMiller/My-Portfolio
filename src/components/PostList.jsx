import Thumbnail from "@/src/components/Thumbnail";
import { urlForImage } from "@/sanity/lib/image";
import { tsToSimple } from "@/src/util/timestamps";

function PostList({ posts }) {
  return (
    <>
      {posts?.map(({ title, preview, hook, slug, _createdAt }, i) => {
        return (
          <a key={i} href={`/blog/${slug.current}`} className="post-card">
            <Thumbnail src={urlForImage(preview.image).quality(60).url()} />
            <div className="card-body">
              <p className="time-title">{tsToSimple(_createdAt)}</p>
              <h2 className="card-title">{title}</h2>
              <p>{hook}</p>
            </div>
          </a>
        );
      })}
    </>
  );
}

export default PostList;
