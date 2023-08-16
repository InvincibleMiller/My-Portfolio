import { NextResponse } from "next/server";
import { getHero } from "@/sanity/sanity.query";

export async function GET(req) {
  try {
    const hero = await getHero();

    return NextResponse.json(hero, {});
  } catch (err) {
    return NextResponse.error(err);
  }
}
