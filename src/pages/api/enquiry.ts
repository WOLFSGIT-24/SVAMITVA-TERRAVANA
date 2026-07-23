import type { APIRoute } from 'astro';

const MAKE_WEBHOOK = 'https://hook.us1.make.com/hkc9abx8432bfl2p01al8k4jiinh6rlu';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // ── Parse body ──────────────────────────────────
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid request body' }, 400);
  }

  // ── Validate required fields ─────────────────────
  for (const field of ['name', 'phone', 'email']) {
    if (!body[field]?.trim()) {
      return json({ success: false, error: `Missing field: ${field}` }, 400);
    }
  }

  // ── Build exact payload ──────────────────────────
  const payload = {
    name:        body.name.trim(),
    phone:       body.phone.trim(),
    email:       body.email.trim(),
    message:     (body.message ?? '').trim(),
    submit_date: new Date().toISOString(),
  };

  // ── Forward to Make.com ──────────────────────────
  try {
    const makeRes = await fetch(MAKE_WEBHOOK, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    // Make.com returns 200 with body "Accepted" (plain text) on success.
    // Status >= 500 means an actual problem.
    if (makeRes.status >= 500) {
      const text = await makeRes.text().catch(() => '');
      return json({ success: false, error: `Webhook error ${makeRes.status}: ${text}` }, 502);
    }

    return json({ success: true }, 200);

  } catch (fetchErr) {
    const msg = fetchErr instanceof Error ? fetchErr.message : 'Network error';
    return json({ success: false, error: `Could not reach webhook: ${msg}` }, 502);
  }
};

// ── Helper ───────────────────────────────────────
function json(data: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
