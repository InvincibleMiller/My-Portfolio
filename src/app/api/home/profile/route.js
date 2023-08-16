import { NextResponse } from "next/server";
import { getProfile } from "@/sanity/sanity.query";

export async function GET(req) {
  try {
    const profile = await getProfile();

    return NextResponse.json(profile, {});
  } catch (err) {
    return NextResponse.error(err);
  }
}
