import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/enquiry.ts
var enquiry_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var MAKE_WEBHOOK = "https://hook.us1.make.com/hkc9abx8432bfl2p01al8k4jiinh6rlu";
var POST = async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return json({
			success: false,
			error: "Invalid request body"
		}, 400);
	}
	for (const field of [
		"name",
		"phone",
		"email"
	]) if (!body[field]?.trim()) return json({
		success: false,
		error: `Missing field: ${field}`
	}, 400);
	const payload = {
		name: body.name.trim(),
		phone: body.phone.trim(),
		email: body.email.trim(),
		message: (body.message ?? "").trim(),
		submit_date: (/* @__PURE__ */ new Date()).toISOString()
	};
	try {
		const makeRes = await fetch(MAKE_WEBHOOK, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		if (makeRes.status >= 500) {
			const text = await makeRes.text().catch(() => "");
			return json({
				success: false,
				error: `Webhook error ${makeRes.status}: ${text}`
			}, 502);
		}
		return json({ success: true }, 200);
	} catch (fetchErr) {
		return json({
			success: false,
			error: `Could not reach webhook: ${fetchErr instanceof Error ? fetchErr.message : "Network error"}`
		}, 502);
	}
};
function json(data, status) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "Content-Type": "application/json" }
	});
}
//#endregion
//#region \0virtual:astro:page:src/pages/api/enquiry@_@ts
var page = () => enquiry_exports;
//#endregion
export { page };
