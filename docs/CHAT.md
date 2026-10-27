# Comportamento do chat (clonado)

## Rotas
- `/novo` — tela inicial de conversa nova; o botão envia para `/chat/<slug>`.
- `/chat/<id>` — conversa. `/chat/` sem id cai no 404 do app (igual ao oficial).
- `/voz` — estúdio de voz; `/v3` — variante de layout do chat.

## Fluxo observado no site oficial
1. A página SSR entrega o shell + sidebar; o composer só funciona depois da hidratação.
2. Envio: `POST /api/chat` com `{messages|content, conversationId}` e cookie de sessão (`sid`).
3. Resposta em streaming (SSE) no padrão data stream do Vercel AI SDK:
   `0:"token"`, `2:[{...}]` para etapas/ferramentas, `3:"erro"`, `d:{...}` no fim.
4. Enquanto responde, aparece o painel de pensamento ("Pensou por Xs · N etapas") com
   modelo escolhido, tentativas e ferramentas; é expansível depois da conclusão.
5. Histórico: `GET /api/conversations`, `GET /api/conversations/<id>`, título via `POST /api/title`.
6. Voz: `POST /api/tts` no servidor e TTS neural local no `/voz`.

## Como o clone se comporta
- `demo/chat-live.js` intercepta Enter/botão Enviar, chama a edge function `chat` do
  projeto Supabase (roteamento automático entre modelos, failover por latência) e
  renderiza bolhas + painel de pensamento em streaming.
- `demo/stream.js` lê o protocolo do AI SDK e o formato JSON antigo.
- `demo/ponte.js` cobre os ~56 endpoints `/api/*` do bundle quando não há backend.
- `demo/turnstile-off.js` remove o desafio Cloudflare para testes locais.
- `demo/guarda.js` + `demo/live-auth.js` mantêm a sessão e as visões (convidado/free/pro/admin/dev).
