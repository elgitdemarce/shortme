import { brotliDecompress } from "zlib";
import { promisify } from "util";
import { NextResponse } from "next/server";

const decompress = promisify(brotliDecompress);

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const buffer = Buffer.from(params.code, "base64url");
    const decompressed = await decompress(buffer);

    const originalUrl = decompressed.toString();

    return NextResponse.redirect(originalUrl);
  } catch {
    return new NextResponse("Invalid short URL", { status: 400 });
  }
}
