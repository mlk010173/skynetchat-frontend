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
    if (p.indexOf("/api/chat") !== -1) {
      var ev2 = [
        { type: "start", messageId: "demo-msg-1" },
        { type: "thinking-meta", summaryTitle: "Pensando" },
        { type: "step-start", stepId: "s1", stepType: "thinking" },
        { type: "step-delta", stepId: "s1", delta: "Interpretando o pedido e separando o que e pergunta do que e contexto." },
        { type: "step-end", stepId: "s1", title: "Interpretar pedido" },
        { type: "step-start", stepId: "s2", stepType: "search", searchQueries: ["skynetchat 4.5", "linha de pensamento"] },
        { type: "step-delta", stepId: "s2", delta: "Consultando fontes e cruzando as informacoes." },
        { type: "step-end", stepId: "s2", title: "Pesquisar na web" },
        { type: "step-start", stepId: "s3", stepType: "thinking" },
        { type: "step-delta", stepId: "s3", delta: "Organizando a resposta final." },
        { type: "step-end", stepId: "s3", title: "Montar resposta" },
        { type: "start-step" },
        { type: "reasoning-start", id: "r1" },
        { type: "reasoning-delta", id: "r1", delta: "Interpretando o pedido e separando pergunta de contexto." },
        { type: "reasoning-delta", id: "r1", delta: " Consultando fontes na web e cruzando as informacoes." },
        { type: "reasoning-delta", id: "r1", delta: " Organizando a resposta final." },
        { type: "reasoning-end", id: "r1" },
        { type: "text-start", id: "t1" }
      ];
      var txt2 = "Esta e uma resposta de demonstracao do espelho estatico.\n\nOs controles reais da mensagem aparecem abaixo: copiar, regenerar, boa resposta, resposta ruim, compartilhar e ouvir. Acima, a linha de pensamento mostra as etapas que o SKYNETchat executa antes de responder.";
      (txt2.match(/[\s\S]{1,12}/g) || []).forEach(function (c) { ev2.push({ type: "text-delta", id: "t1", delta: c }); });
      ev2.push({ type: "text-end", id: "t1" }, { type: "finish-step" }, { type: "finish" });
      var body2 = new ReadableStream({
        start: function (ctrl) {
          var enc = new TextEncoder(); var i = 0;
          function tick() {
            if (i >= ev2.length) { try { ctrl.enqueue(enc.encode("data: [DONE]\n\n")); ctrl.close(); } catch (x) {} return; }
            ctrl.enqueue(enc.encode("data: " + JSON.stringify(ev2[i++]) + "\n\n"));
            setTimeout(tick, i < 10 ? 350 : 35);
          }
          tick();
        }
      });
      return Promise.resolve(new Response(body2, { status: 200, headers: { "Content-Type": "text/event-stream" } }));
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
