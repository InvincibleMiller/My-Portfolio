import createImageUrlBuilder from "@sanity/image-url";

import { client } from "./client";

const imageBuilder = createImageUrlBuilder(client);

export const urlForImage = (source) =>
  imageBuilder?.image(source).auto("format").fit("max");

export const urlForImageBase = (source) => imageBuilder?.image(source).url();
