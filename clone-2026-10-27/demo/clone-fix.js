/* Ajustes do clone estático: caminhos absolutos do app e chamadas de API. */
(function () {
  var BASE = window.__SKY_BASE || "";
  if (!BASE) return;

  function corrige(url) {
    if (typeof url !== "string" || url.charAt(0) !== "/") return url;
    if (url.indexOf("//") === 0) return url;
    if (url.indexOf(BASE + "/") === 0) return url;
    if (/^\/(api|cdn-cgi|_app)\//.test(url)) return url;
    return BASE + url;
  }

  var setAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (nome, valor) {
    if ((nome === "src" || nome === "href" || nome === "poster") && typeof valor === "string") {
      valor = corrige(valor);
    }
    return setAttr.call(this, nome, valor);
  };

  [HTMLImageElement, HTMLScriptElement, HTMLLinkElement, HTMLSourceElement,
   HTMLVideoElement, HTMLAudioElement, HTMLIFrameElement].forEach(function (tipo) {
    ["src", "href", "poster"].forEach(function (prop) {
      try {
        var desc = Object.getOwnPropertyDescriptor(tipo.prototype, prop);
        if (!desc || !desc.set) return;
        Object.defineProperty(tipo.prototype, prop, {
          configurable: true,
          get: desc.get,
          set: function (v) { return desc.set.call(this, corrige(v)); }
        });
      } catch (e) {}
    });
  });

  function varre(raiz) {
    var els = raiz.querySelectorAll ? raiz.querySelectorAll("[src],[href]") : [];
    for (var i = 0; i < els.length; i++) {
      ["src", "href"].forEach(function (a) {
        var v = els[i].getAttribute(a);
        var c = corrige(v);
        if (c !== v) setAttr.call(els[i], a, c);
      });
    }
  }
  try {
    new MutationObserver(function (ms) {
      for (var i = 0; i < ms.length; i++) {
        var alvos = ms[i].addedNodes || [];
        for (var j = 0; j < alvos.length; j++) {
          if (alvos[j].nodeType === 1) varre(alvos[j]);
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {}

  document.addEventListener("DOMContentLoaded", function () { varre(document); });
  varre(document);

  /* API do backend não existe no clone: responde vazio para não poluir o console */
  var f = window.fetch;
  if (f) {
    window.fetch = function (entrada, init) {
      var url = typeof entrada === "string" ? entrada : (entrada && entrada.url) || "";
      var caminho = url.replace(location.origin, "");
      if (/^\/api\//.test(caminho) && caminho.indexOf("/api/chat") !== 0) {
        return Promise.resolve(new Response("{}", { status: 200, headers: { "content-type": "application/json" } }));
      }
      return f.apply(this, arguments);
    };
  }
})();
