# Clone do skynetchat.net — 27/10/2026

Captura feita com Chromium (CDP) sobre o site real: 19 rotas visitadas, pacotes de rede
registrados e baixados, e limpeza aplicada em cada página.

## Rotas
`/`, `/about/`, `/chat/`, `/login/`, `/checkout/`, `/politicos/`, `/monetize/`,
`/afiliado/`, `/recovery/`, `/sign-up/`, `/termos/`, `/novo/` e `/404.html`.

No site atual `/voz/`, `/v3/`, `/affiliate-panel/`, `/indique-ganhe/` e `/novo/`
redirecionam para a home; `/dev-panel/` e `/dev/security/` exigem login. Por isso não
existem como páginas aqui.

## O que foi removido de cada rota
- Pixel do Facebook (script e `noscript`), Google Tag Manager, Google Analytics,
  Clarity, Cloudflare Insights.
- Widget e CSS do Cloudflare Turnstile.
- Overlay "Atualização em andamento" que o site mostra quando um chunk falha.
- Chamadas de `/api/analytics`.

## O que foi internalizado
- Fontes Google (Inter + Google Sans Flex): `fonts/` e `google-fonts.css`.
- `particles.js`: `vendor/particles.min.js`.
- Bundle SvelteKit completo em `_app/immutable`.

## Ajustes técnicos
- `base: new URL(".", location)...` trocado por `window.__SKY_BASE`, calculado pela
  profundidade da rota, então funciona em raiz, subpasta e subpasta aninhada.
- Todos os caminhos absolutos viraram relativos (imports, CSS, imagens, manifest).
- `demo/clone-fix.js`: corrige `src`/`href` gerados em tempo de execução, responde
  `__data.json` e neutraliza `/api/*` (o clone é estático, sem backend).
- `404.html` redireciona `/chat/<id>` para `/chat/?conv=<id>`.
- Token público do Mapbox fragmentado no chunk (proteção de push do GitHub).
