import type { APIRoute } from 'astro';

const MAKE_WEBHOOK = 'https://hook.us1.make.com/hkc9abx8432bfl2p01al8k4jiinh6rlu';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate required fields
  const required = ['name', 'phone', 'email'];
  for (const field of required) {
    if (!body[field]?.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: `Missing required field: ${field}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // Exact payload format as required
  const payload = {
    name:        body.name.trim(),
    phone:       body.phone.trim(),
    email:       body.email.trim(),
    message:     (body.message ?? '').trim(),
    submit_date: new Date().toISOString(),
  };

  try {
    const makeRes = await fetch(MAKE_WEBHOOK, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!makeRes.ok) {
      return new Response(
        JSON.stringify({ success: false, error: `Webhook returned ${makeRes.status}` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to reach webhook' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
