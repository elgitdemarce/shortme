export const runtime = "nodejs";
import { brotliCompress } from "zlib";
import { promisify } from "util";

const compress = promisify(brotliCompress);

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return Response.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Comprimir con Brotli (mejor ratio)
    const compressed = await compress(Buffer.from(url), {
      params: {
        1: 11, // Brotli max quality
      },
    });

    const encoded = compressed.toString("base64url");

    const base = process.env.NEXT_PUBLIC_BASE_URL;
    const shortUrl = `${base}/${encoded}`;

    return Response.json({ shortUrl });
  } catch (err) {
    return Response.json({ error: "Encoding failed" }, { status: 500 });
  }
}
