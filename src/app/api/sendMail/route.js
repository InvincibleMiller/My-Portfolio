import { NextResponse } from "next/server";
import sendMail from "@/nodemailer/nodemailer";

export async function POST(req) {
  try {
    const { from, subject, content } = await req.json();

    const res = await sendMail(from, subject, content);

    return NextResponse({ msg: res }).json();
  } catch (err) {
    return new Error(err);
  }
}
