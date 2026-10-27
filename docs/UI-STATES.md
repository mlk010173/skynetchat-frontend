# Estados de interface do espelho (modo demo)

O espelho é estático, mas as telas protegidas continuam renderizando porque o
layout recebe um **usuário demo** embutido e o `fetch` das APIs é interceptado.

## Como funciona

1. `demo/mock.js` (carregado antes do app em todas as páginas) substitui `window.fetch`:
   - `GET /api/session` → `{ user: <demo> }`
   - `/api/preferences`, `/api/conversations/config`, `/api/affiliate*`, `/api/admin/*` → payloads plausíveis
   - `/api/chat*` → stream NDJSON de demonstração
   - `/api/tts` → resposta vazia
   - qualquer outra `/api/*` → `200 {}`
2. O `data` do layout no HTML (`user:null`) foi trocado pelo usuário demo
   (Pro + Admin, `messageQuota: 9999`). Rotas com `data:[..., null]` recebem `{}`.
3. `base` do SvelteKit foi fixado em `/skynetchat-frontend` e todos os assets
   usam caminho absoluto com esse prefixo (necessário em GitHub Pages de projeto).

## Usuário demo

Campos usados pela UI: `id, numberId, email, nickname, isPro, isAdmin, isBetaTester,
isInfluencer, hasStripeSubscription, hasStripeCustomer, subscriptionExpired,
proExpiresAt, proPurchasedAt, currentPlan, messageQuota, messagesUsed,
memoryEnabled, canPublish, shouldShowRecoveryPrompt, shouldShowInitialFeedback`.

## Rotas mapeadas (17)

| Rota | Estado |
|---|---|
| `/` | chat, sidebar, composer, ações rápidas |
| `/quota/` | variante com cota esgotada |
| `/about/` | institucional |
| `/politicos/` | OSINT eleitoral (TSE) |
| `/afiliado/` | programa de afiliados |
| `/affiliate-panel/` | painel do afiliado (redireciona ao chat logado) |
| `/checkout/` | planos PRO, preços, PIX/cartão |
| `/monetize/` | monetização |
| `/indique-ganhe/` | indique e ganhe |
| `/novo/`, `/v3/`, `/voz/` | variações de chat |
| `/login/`, `/sign-up/`, `/recovery/` | autenticação |
| `/dev/security/` | login SECURE de 12 dígitos |
| `/termos/` | termos e privacidade |

Galeria navegável: `/demo/`.
