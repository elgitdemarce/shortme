export const runtime = "nodejs";

import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return Response.json({ error: "Invalid URL" }, { status: 400 });
    }

    const code = nanoid(6);

    await kv.set(code, url);

    const base = process.env.NEXT_PUBLIC_BASE_URL;
    const shortUrl = `${base}/${code}`;

    return Response.json({ shortUrl });
  } catch (err) {
    return Response.json({ error: "Encoding failed" }, { status: 500 });
  }
}
