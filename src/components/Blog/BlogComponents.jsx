import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

export function EmbeddedImage({ value: { image, alt, caption } }) {
  return (
    <div>
      <img className="blog" src={urlForImage(image).url()} alt={alt} />
      {caption && (
        <div className="card-body">
          <PortableText value={caption} />
        </div>
      )}
    </div>
  );
}

export function EmbeddedVideo({ value }) {
  return <div>{JSON.stringify(value)}</div>;
}
