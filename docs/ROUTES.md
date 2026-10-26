# Mapa de Rotas — SKYNETchat

Todas as rotas mapeadas por navegação real e análise dos bundles (26/out/2026).

## Páginas públicas (rotas reais, HTTP 200)

| Rota | Título | Descrição |
|---|---|---|
| `/` | SKYNETchat — Chat de IA em português | Home: chat principal + sidebar + hero |
| `/about` | SKYNETchat — Chat de IA em português | "Conheça o SKYNETchat" — como funciona o projeto |
| `/login` | SKYNETchat — Chat de IA em português | Página de login (com Cloudflare Turnstile) |
| `/sign-up` | SKYNETchat — Chat de IA em português | Cadastro de nova conta |
| `/monetize` | Monetize com o SKYNETchat | Programa de monetização/influenciadores |
| `/termos` | Termos de Uso e Política de Privacidade — SkynetChat | Termos de uso e privacidade |
| `/recovery` | SKYNETchat — Chat de IA em português | Recuperação de conta (linkada da tela de login, com `/api/recovery/request` e `/api/recovery/email`) |
| `/checkout` | SKYNETchat — Chat de IA em português | Checkout de assinatura PRO (Stripe) |
| `/chat/:id` | SKYNETchat — Chat de IA em português | Conversa específica por ID (rota dinâmica; `/chat` sem ID retorna 404) |
| `/*` (404) | — | Página de erro 404 personalizada |

## Rotas protegidas / redirecionamentos

| Rota | Comportamento |
|---|---|
| `/dev-panel` | Redireciona para `/login` (painel administrativo protegido) |
| `/affiliate-panel` | Redireciona para `/` (exigindo sessão; painel de afiliados) |
| `/indique-ganhe` | Redireciona para `/` (painel "Indique e Ganhe" aberto na home) |
| `/voz` | Redireciona para `/` (funcionalidade de voz dentro do chat) |

## Painéis / modais da home (componentes na interface)

Estes itens da sidebar não navegam para rotas, abrem painéis/modais dentro da própria home:

1. **Novo chat** — inicia conversa do zero
2. **Indique e Ganhe** — convide amigos e ganhe assinatura PRO
3. **Monetize com SKYNETchat** (NOVO) → também com rota própria `/monetize`
4. **Atualizações** — novidades e melhorias recentes (dados via `/api/updates`)
5. **Imagens** (BETA) — geração e exploração de imagens com IA
6. **Conversas em grupo** (NOVO) — colaboração com múltiplos agentes
7. **Codex** (EM BREVE) — código, scripts e automação
8. **Projetos** (NOVO) — organização de tarefas e entregas (componente ProjectDetailPanel)
9. **Histórico de conversas** — revisão de chats anteriores
10. **Prompts** — prompts úteis para usar com a IA
11. **Suporte** — dúvidas e contato com suporte
12. **Fazer login** → rota `/login`
13. **Tema de fundo** — seletor de tema (atual: BLACK)
14. **Termos de Serviço** → rota `/termos`

## Endpoints de API (46 mapeados no frontend)

Chat e mensagens:
- `/api/chat`, `/api/chat-V2-fast`, `/api/chat-V2-thinking`, `/api/chat-V3`, `/api/chat-V3-thinking`, `/api/chat-V4`
- `/api/chat-search`, `/api/title`, `/api/speak` (TTS), `/api/vision`, `/api/classify-intent`

Imagens e arquivos:
- `/api/image-gen`, `/api/image-followups`, `/api/files/upload`, `/api/files/`, `/api/file-extract`, `/cached-images/`

Contas e sessão:
- `/api/session`, `/api/recovery/email`, `/api/recovery/request`, `/api/security/new-code`

Produtos e recursos:
- `/api/projects`, `/api/groups`, `/api/prompts`, `/api/memory`, `/api/memory/toggle`, `/api/preferences`, `/api/integrations`, `/api/integrations/gmail/permissions`

Suporte e feedback:
- `/api/support`, `/api/support/session`, `/api/feedback`, `/api/initial-feedback`, `/api/updates`, `/api/log`, `/api/log/message`

Ferramentas:
- `/api/osint`, `/api/export-pdf`, `/api/pdf-generate`, `/api/code-repair`, `/api/currency-verify`, `/api/analytics`

Comercial:
- `/api/stripe/portal`, `/api/admin/accounts`, `/api/admin/influencer`, `/api/conversations/config`, `/api/conversations/migrate`
