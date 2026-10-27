# Rotas mapeadas

Extraídas do `__vite__mapDeps`/dicionário do SvelteKit e visitadas uma a uma no
Chromium com a sessão ativa. Total: 19 páginas.

| Rota | Título |
|---|---|
| `/` | SKYNETchat — Chat de IA em português |
| `/about` | SKYNETchat — Chat de IA em português |
| `/affiliate-panel` | SKYNETchat — Chat de IA em português |
| `/afiliado` | Programa de Afiliados para Influenciadores - SKYNETchat |
| `/checkout` | SKYNETchat — Chat de IA em português |
| `/dev-panel` | SKYNETchat — Chat de IA em português |
| `/dev/security` | SKYNETchat — Chat de IA em português |
| `/indique-ganhe` | SKYNETchat — Chat de IA em português |
| `/login` | SKYNETchat — Chat de IA em português |
| `/monetize` | Monetize com o SKYNETchat |
| `/novo` | SKYNETchat — Chat de IA em português |
| `/politicos` | Investigar Políticos — SKYNETchat |
| `/recovery` | SKYNETchat — Chat de IA em português |
| `/sign-up` | SKYNETchat — Chat de IA em português |
| `/termos` | Termos de Uso e Política de Privacidade — SkynetChat |
| `/v3` | SKYNETchat — Chat de IA em português |
| `/voz` | SKYNETchat — Chat de IA em português |
| `/chat/` | SKYNETchat — Chat de IA em português |
| `/chat/demo` | SKYNETchat — Chat de IA em português |

Observações de comportamento:

- `/chat/` (sem id) devolve a página de erro 404 do próprio app; o chat real vive em `/chat/<id>`.
- `/dev-panel` e `/dev/security` são painéis internos que respondem mesmo sem sessão, mas as
  chamadas de dados exigem conta com `role=admin`.
- `/checkout` redireciona para o fluxo de assinatura; `/affiliate-panel` e `/afiliado` são o
  mesmo produto em duas entradas (painel e landing).
- `?_r=<timestamp>` na URL é o guard anti-cache do app, não é rota nova.
