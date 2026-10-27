/* MODO DEMO — espelho estático do SKYNETchat.
   Simula sessão/API para as telas protegidas renderizarem interface com dados fictícios.
   Nenhum dado real de conta é usado. */
(function () {
  var DEMO_USER = {
    id: "demo-0000-0000-0000-000000000001",
    email: "convidado@demo.local",
    name: "Convidado",
    plan: "pro",
    role: "admin",
    credits: 9999,
    created_at: "2026-01-01T00:00:00Z"
  };
  var orig = window.fetch ? window.fetch.bind(window) : null;
  if (!orig) return;
  function json(obj, status) {
    return new Response(JSON.stringify(obj), {
      status: status || 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || "";
    var method = (init && init.method) || (input && input.method) || "GET";
    var p = url.split("?")[0];
    var isApi = p.indexOf("/api/") !== -1;
    if (!isApi) return orig(input, init);
    if (p.endsWith("/api/session")) return Promise.resolve(json({ user: DEMO_USER }));
    if (p.endsWith("/api/preferences")) return Promise.resolve(json({ theme: "black", model: "skynet-v4" }));
    if (p.indexOf("/api/conversations/config") !== -1)
      return Promise.resolve(json({ models: [{ id: "skynet-v4", name: "SKYNET V4" }] }));
    if (p.indexOf("/api/chat-V3") !== -1 || p.indexOf("/api/chat") !== -1) {
      var txt = "Resposta de demonstração do espelho estático: aqui aparece o texto do SKYNET em streaming.";
      var body = new ReadableStream({
        start: function (c) {
          var enc = new TextEncoder();
          c.enqueue(enc.encode(JSON.stringify({ delta: txt }) + "\n"));
          c.enqueue(enc.encode(JSON.stringify({ done: true }) + "\n"));
          c.close();
        }
      });
      return Promise.resolve(new Response(body, { status: 200, headers: { "Content-Type": "application/x-ndjson" } }));
    }
    if (p.indexOf("/api/tts") !== -1) return Promise.resolve(new Response(new ArrayBuffer(0), { status: 200 }));
    if (p.indexOf("/api/affiliate") !== -1)
      return Promise.resolve(json({ ok: true, balance: 0, referrals: 0, pending: 0, total_earned: 0, withdrawals: [], dashboard: {} }));
    if (p.indexOf("/api/admin/") !== -1) {
      if (p.indexOf("stats") !== -1 || p.indexOf("summary") !== -1 || p.indexOf("analytics") !== -1)
        return Promise.resolve(json({ ok: true, stats: {}, items: [], rows: [], totals: {} }));
      return Promise.resolve(json({ ok: true, items: [], rows: [], total: 0 }));
    }
    // fallback: 200 vazio para as demais rotas de API
    return Promise.resolve(json({ ok: true, items: [], data: null }));
  };
})();
