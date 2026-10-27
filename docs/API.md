# API observada

Endpoints chamados pelo frontend (análise estática dos chunks + rede).
Total: 68.

```
/api/access-code
/api/admin
/api/admin/
/api/admin/accounts
/api/admin/feedback
/api/admin/influencer
/api/admin/metrics-refresh
/api/admin/pix-metrics-details
/api/admin/pix-summary
/api/admin/subaccounts
/api/admin/support
/api/affiliate
/api/affiliate/withdraw
/api/analytics
/api/auth
/api/chat
/api/chat-search
/api/checkout-recover
/api/classify-intent
/api/code-repair
/api/conversations
/api/conversations/config
/api/conversations/migrate
/api/currency-verify
/api/export-pdf
/api/feedback
/api/file-extract
/api/files/
/api/files/upload
/api/groups
/api/image-followups
/api/image-gen
/api/initial-feedback
/api/integrations
/api/integrations/${ke}
/api/integrations/${ke}/connect
/api/integrations/${ke}/preview
/api/integrations/gmail/permissions
/api/log
/api/log/message
/api/login
/api/memory
/api/memory/toggle
/api/monetize-interest
/api/osint
/api/pdf-generate
/api/pix
/api/politicos
/api/preferences
/api/projects
/api/projects/${m.id}
/api/prompts
/api/recovery/email
/api/recovery/request
/api/security/new-code
/api/session
/api/signup
/api/speak
/api/stripe/checkout
/api/stripe/portal
/api/support
/api/support/session
/api/title
/api/tts
/api/tts-eleven
/api/updates
/api/verify
/api/vision
```

O espelho não implementa essas rotas de servidor: no clone elas são atendidas por
`demo/ponte.js` (dados coerentes) e, quando existe backend próprio, pela edge function
`chat` do Supabase.
