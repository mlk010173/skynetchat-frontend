# SKYNETchat — clone do frontend (skynetchat.net)

Espelho estático completo do app SvelteKit de **skynetchat.net**, capturado em
27/10/2026 navegando com o Chromium real (o desafio da Cloudflare foi passado com
a sessão do dono). Serve como cópia navegável de estudo e como base do produto.

## O que está aqui

- `index.html` + 18 rotas em pastas próprias (ver `docs/ROUTES.md`)
- `_app/immutable/**` — 73 chunks JS, 20 CSS e as fontes KaTeX do build original
- `fonts/` + `google-fonts.css` — Google Sans Flex e Inter vendorizadas
- `vendor/particles.min.js` — CDN internalizado
- `demo/` — camada que faz o clone funcionar sem o servidor original:
  - `ponte.js` atende os ~68 endpoints `/api/*` que o bundle chama
  - `chat-live.js` + `stream.js` dão o chat com streaming e painel de pensamento
    (protocolo do Vercel AI SDK: `0:` texto, `2:` etapas, `d:` fim)
  - `turnstile-off.js` remove o card da Cloudflare
  - `live-auth.js`, `guarda.js`, `entrar-direto.js`, `mock.js` — sessão, visões
    (convidado/free/pro/admin/dev) e login por código de 12 dígitos
- `docs/` — `ROUTES.md`, `API.md`, `CHAT.md`, `DESIGN.md`

## Rodar local

Qualquer servidor estático na raiz do repositório:

```bash
python3 -m http.server 8099
# http://127.0.0.1:8099/
```

Também funciona em subpasta (`/skynetchat-frontend/`): o `base` do SvelteKit é
calculado em runtime por `window.__SKY_BASE` e os caminhos são relativos por
profundidade.

## Observações

- `/chat/` sem id devolve 404 no app original também; use `/chat/<id>`.
- As rotas de backend (`/api/*`) não existem aqui: quem responde é a ponte.
- Conteúdo e marca pertencem ao dono do SKYNETchat. Não é para uso público sem
  autorização.
