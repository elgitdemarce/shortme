export const runtime = "nodejs";

import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const originalUrl = await kv.get<string>(params.code);

  if (!originalUrl) {
    return new NextResponse("Invalid short URL", { status: 404 });
  }

  return NextResponse.redirect(originalUrl);
}
