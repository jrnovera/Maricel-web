import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * The admin portal is a separate deployment from this site, so its own
 * `revalidatePath()` calls only ever clear *its* cache, never ours — this is
 * the other half of that call: the admin fetches this route right after a
 * save, and we drop our cached copy of that path immediately instead of
 * waiting out the page's `revalidate` window.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { path, secret } = (body ?? {}) as { path?: string; secret?: string };

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!path || typeof path !== "string" || !path.startsWith("/")) {
    return NextResponse.json(
      { error: "`path` must be a string starting with /" },
      { status: 400 }
    );
  }

  revalidatePath(path);
  return NextResponse.json({ revalidated: true, path });
}
