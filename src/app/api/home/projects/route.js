import { NextResponse } from "next/server";
import { getProjects } from "@/sanity/sanity.query";

export async function GET(req) {
  try {
    const projects = await getProjects();

    return NextResponse.json(projects, {});
  } catch (err) {
    return NextResponse.error(err);
  }
}
