import { NextResponse } from "next/server";
import { readCms, writeCms } from "@/lib/cms";
import type { CmsState } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = readCms();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as CmsState;
    writeCms(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
