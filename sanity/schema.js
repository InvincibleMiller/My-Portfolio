// New Portfolio
import HomePage from "./schemas/documents/HomePage";
import Featured from "./schemas/objects/featured";
import Social from "./schemas/objects/social";
import BlogImage from "./schemas/objects/blogImage";
import EmbeddedVideo from "./schemas/objects/embeddedVideo";
import Post from "./schemas/documents/Post";

export const schema = {
  types: [
    // Documents
    HomePage,
    Post,
    // Objects
    Featured,
    Social,
    BlogImage,
    EmbeddedVideo,
  ],
};
