"use client"

import { SanityImage } from "sanity-image";
import { dataset, projectId } from "/sanity/env";

const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`;

export const Image = (props) => <SanityImage baseUrl={baseUrl} {...props} />;
